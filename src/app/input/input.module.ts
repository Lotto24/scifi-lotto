import {NgModule} from '@angular/core';
import {JogDialComponent} from './jog-dial.component';
import {BrowserModule} from '@angular/platform-browser';
import {DialDirective} from './dial.directive';

const components = [
  JogDialComponent,
  DialDirective
]

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: components,
  exports: components,
})
export class InputModule {
}
