# NGX Image

[![npm package](https://nodei.co/npm/ngx-image.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)

Library that lazy load the image in any format on Angular.

## Description

This library offers an easy way to treat images and deliver excellent performance with multiple image formats in browser context with no error if you are using Server Side Rendering.

## Installation

Use the node package manager to install

```bash
npm i ngx-image
```

or

```bash
yarn add ngx-image
```

## Usage

First import the `Image Module` to the module in your project that you will use `ngx-image`.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ImageModule } from 'ngx-image';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then, declare a variable that values ​​the image - _placeholder_ and _url_ - and places the value of each image url.:

```typescript
import { Component } from '@angular/core';

import { Image } from 'ngx-image';

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
```

Now place the _Inputs_ and their respective variables in the `plop-image` image component

```html
<ng-template ngFor let-image [ngForOf]="images">
  <plop-image class="image" [regular]="image" [description]="'test'" ratio="1by1"></plop-image>
</ng-template>

<plop-image class="image" [regular]="webpExample.regular" [webp]="webpExample.webp" [description]="'test'" ratio="1by1">
</plop-image>

<plop-image class="image" [regular]="shapeExample" [description]="'test'" [inshape]="true" ratio="1by1"></plop-image>
```

Let's style this

```scss
:host {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.image {
  width: 25%;
  margin: 1em;
}
```

## Properties

#### ImageComponent

 * Selector: [plop-image]

### 

| Name             | Description        | Nullable |
| ---------------- | ------------------ | -------- |
| **@Input() regular: [Image](#image)** | Image in any regular format (.png, .jpg).| no |
| **@Input() wep: [Image](#image)** | Image in any webp format.| yes |
| **@Input() ratio: [ImageRatio](#image-ratio)** | Image ratio.| no |
| **@Input() inshape: boolean** | Image object fit in the center. | yes |


## Entities

#### Image
| Attribute   | Description     | Type | Nullable |
| ----------- | --------------- | ---- | -------- |
| `placeholder` | URL of the image to load, this should be the original image, but with a lower quality (to serve as a 'placeholder'), it can be a 100 x 100 resolution to load quickly, few pixels. In the case of only original image (only one URL), this should be either the URL of the original image.  | string | no | 
| `url` | URL of the image to load, this should be the original image. | string | yes |

#### Image Ratio
| Options   | 
| --------- | 
| `1by1`    | 
| `16by9`   | 
| `16by10`  | 
| `4by3`    | 
| `8by3`    | 


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
