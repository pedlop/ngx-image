import { Component } from '@angular/core';
import { Image } from 'projects/ngx-image/src/public-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'plop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly assets: string;

  images: Image[];
  webpExample: { regular: Image, webp: Image };
  shapeExample: Image;

  constructor() {
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

}
