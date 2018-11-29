import {Component} from '@angular/core';

@Component({
  selector: 'app-jog-dial',
  styleUrls: [
    './jog-dial.component.scss'
  ],
  template: `
    <div (appDial)="value = $event" class="wrapper">
      <span *ngIf="value" class="value">
        {{ value }}
      </span>
    </div>
  `
})
export class JogDialComponent {
  public value: any;
}
