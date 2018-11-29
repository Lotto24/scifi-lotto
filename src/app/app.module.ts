import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HudRingComponent} from './hud-ring/hud-ring.component';
import {InputModule} from './input/input.module';

@NgModule({
  declarations: [
    AppComponent,
    HudRingComponent
  ],
  imports: [
    BrowserModule,
    InputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
