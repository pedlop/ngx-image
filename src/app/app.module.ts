import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ImageModule } from 'projects/ngx-image/src/public-api';

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
