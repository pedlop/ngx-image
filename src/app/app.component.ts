import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Image } from 'ngx-image';

import { ApiService } from './core/api/api.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'plop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly assets: string;

  randomImages$: Observable<Image[]>;
  images: Image[];
  regularExample: Image;
  webpExample: { regular: Image, webp: Image };
  shapeExample: Image;

  constructor(
    private apiService: ApiService
  ) {
    this.assets = `${environment.application.protocol}://${environment.application.host}/${environment.application.assets}`;
    this.images = [
      {
        placeholder: `${this.assets}/images/ironman_1by1_placeholder.jpg`,
        url: `${this.assets}/images/ironman_1by1_url.jpg`
      },
      {
        placeholder: `${this.assets}/images/hulkbuster_1by1_placeholder.jpg`,
        url: `${this.assets}/images/hulkbuster_1by1_url.jpg`
      }
    ];

    this.regularExample = {
      placeholder: `${this.assets}/images/ironman_1by1_placeholder.jpg`,
      url: `${this.assets}/images/ironman_1by1_url.jpg`
    };

    this.webpExample = {
      regular: {
        placeholder: `${this.assets}/images/captainamerica_1by1_placeholder.jpg`,
        url: `${this.assets}/images/captainamerica_1by1_url.jpg`
      },
      webp: {
        placeholder: `${this.assets}/images/captainamerica_1by1_placeholder.webp`,
        url: `${this.assets}/images/captainamerica_1by1_url.webp`
      }
    };

    this.shapeExample = {
      placeholder: `${this.assets}/images/blackwidow_placeholder.jpg`
    };

  }

  ngOnInit(): void {
    this.randomImages$ = this.apiService.fetchRandomImages().pipe(
      map(this.responseToImageMapper)
    );
  }

  private responseToImageMapper = (response: any[]): Image[] => {
    return response.map(value => ({ placeholder: value.urls.thumb, url: value.urls.full }));
  }

}
