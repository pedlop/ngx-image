import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy,
  OnInit, PLATFORM_ID, Renderer2, ViewChild, OnChanges, SimpleChanges, Attribute
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { fromEvent, Subject, timer, iif, of } from 'rxjs';
import { takeUntil, mergeMap, tap } from 'rxjs/operators';

import { Image, ImageRatio, imageRatiosAvailable } from './image.model';

@Component({
  selector: 'plop-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('imageElement') imageElement: ElementRef<HTMLImageElement>;

  @Input() regular: Image;
  @Input() webp: Image;
  @Input() description: string;
  @Input() get ratio(): string | number {
    return this.ratioValue;
  }
  set ratio(ratio: string | number) {
    this.ratioValue = ratio;
    if (!isNaN(ratio as any)) {
      const ratioNumber = Number(ratio);
      if (ratioNumber <= 1 && ratioNumber > 0) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'padding-top', `${ratioNumber * 100}%`);
      } else {
        throw new Error('Please provide a valid ratio. Number between 0 and 1 or ImageRatio type.');
      }
    } else if (typeof ratio === 'string' && imageRatiosAvailable.find(r => r === ratio)) {
      this.renderer.addClass(this.elementRef.nativeElement, `image-${this.ratio}`);
    } else {
      throw new Error('Please provide a valid ratio. Number between 0 and 1 or ImageRatio type.');
    }
  }
  @Input()
  get inshape(): boolean {
    return this.inshapeValue;
  }
  set inshape(inshape: boolean) {
    this.inshapeValue = inshape != null && `${inshape}` !== 'false';
  }

  customStyle: { [prop: string]: string };
  finalImage: string;
  webpFinalImage: string;

  private ratioValue: string | number;
  private inshapeValue = false;
  private isNewImage: boolean;
  private readonly observer: IntersectionObserver;
  private readonly targets: Map<Element, ImageComponent>;
  private readonly unsubscribe: Subject<void>;

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.unsubscribe = new Subject();
    this.targets = new Map();
    this.isNewImage = false;
    if (isPlatformBrowser(this.platformID)) {
      if (!window['IntersectionObserver']) {
        console.warn('You do not have IntersectionObserver in your browser!');
        return;
      } else {
        this.observer = new IntersectionObserver(this.handleIntersectionUpdate.bind(this));
      }
    }
  }

  ngOnInit(): void {
    if (!this.regular) {
      throw new Error('Unable to instantiate component, you need to pass an valid regular image');
    }
    if (!this.description) {
      throw new Error('Unable to instantiate component, you need to pass an valid description');
    }
    if (!this.ratio) {
      throw new Error('Unable to instantiate component, you need to pass an valid ratio');
    }

    this.inshape ? this.customStyle = {
      'object-fit': 'cover',
      'object-position': 'center'
    } : this.customStyle = {
      'object-fit': 'inherit',
      'object-position': 'inherit'
    };

    fromEvent(this.imageElement.nativeElement, 'load')
      .pipe(
        mergeMap((event: any) => iif(
          () => !this.regular.url,
          of(true).pipe(
            tap(() => {
              this.handleImageLoaded();
              this.renderer.removeClass(this.imageElement.nativeElement, 'filtered');
            })
          ),
          of(this.checkURLUpdates(event)).pipe(
            tap((placeholderDismissed) => {
              if (placeholderDismissed && !this.isNewImage) {
                this.renderer.removeClass(this.imageElement.nativeElement, 'filtered');
              } else {
                this.handleImageLoaded();
              }
            })
          )
        )),
        tap(() => this.changeDetectorRef.markForCheck()),
        takeUntil(this.unsubscribe)
      ).subscribe();

    if (isPlatformBrowser(this.platformID)) {
      timer(500).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(() => {
        this.observeComponent(this);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.regular && !changes.regular.firstChange) {
      this.regular = changes.regular.currentValue;
      this.isNewImage = true;
      this.renderer.setProperty(this.imageElement.nativeElement, 'src', this.regular.placeholder);
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unobserveComponent();
  }

  observeComponent(target: ImageComponent): void {
    if (this.observer) {
      this.targets.set(this.elementRef.nativeElement, target);
      this.observer.observe(this.elementRef.nativeElement);
    } else {
      target.updateVisibility(true);
    }
  }

  unobserveComponent(): void {
    if (this.observer) {
      this.targets.delete(this.elementRef.nativeElement);
      this.observer.unobserve(this.elementRef.nativeElement);
    }
  }

  updateVisibility(isVisible: boolean): void {
    if (!isVisible) {
      return;
    }
    this.unobserveComponent();
    this.renderer.setProperty(this.imageElement.nativeElement, 'src', this.regular.placeholder);
    this.changeDetectorRef.markForCheck();
  }

  private handleIntersectionUpdate(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      const lazyTarget = this.targets.get(entry.target);
      if (lazyTarget) {
        lazyTarget.updateVisibility(entry.isIntersecting);
      }
    });
  }

  private handleImageLoaded(): void {
    this.renderer.addClass(this.imageElement.nativeElement, 'loaded');
    this.renderer.addClass(this.elementRef.nativeElement, 'loaded');
    this.finalImage = this.regular.url;
    this.webpFinalImage = this.webp && this.webp.url ? this.webp.url : '';
    this.isNewImage = false;
    this.changeDetectorRef.markForCheck();
  }

  private checkURLUpdates({ target }: any): boolean {
    if (this.webp) {
      return target.currentSrc !== this.regular.placeholder && target.currentSrc !== this.webp.placeholder;
    } else {
      return target.currentSrc !== this.regular.placeholder;
    }
  }

}
