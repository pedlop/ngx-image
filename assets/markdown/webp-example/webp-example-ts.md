```javascript
import { Component } from '@angular/core';

import { Image } from 'ngx-image';

@Component({
  selector: 'plop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  webpExample: Image;

  constructor() {

    this.webpExample = {
      regular: {
        placeholder: '/assets/images/captainamerica_1by1_placeholder.jpg',
        url: '/assets/images/captainamerica_1by1_url.jpg'
      },
      webp: {
        placeholder: '/assets/images/captainamerica_1by1_placeholder.webp',
        url: '/assets/images/captainamerica_1by1_url.webp'
      }
    };

  }

}
```