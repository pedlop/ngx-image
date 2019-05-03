```javascript
import { Component } from '@angular/core';

import { Image } from 'ngx-image';

@Component({
  selector: 'plop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  regularExample: Image;

  constructor() {

    this.regularExample = {
      placeholder: '/assets/images/ironman_1by1_placeholder.jpg',
      url: '/assets/images/ironman_1by1_url.jpg'
    };

  }

}
```