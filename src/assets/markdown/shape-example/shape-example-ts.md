```javascript
import { Component } from '@angular/core';

import { Image } from 'ngx-image';

@Component({
  selector: 'plop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  shapeExample: Image;

  constructor() {

    this.shapeExample = {
      placeholder: '/assets/images/blackwidow_placeholder.jpg'
    };

  }

}
```