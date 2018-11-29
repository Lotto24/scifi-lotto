import {Component} from '@angular/core';

@Component({
  selector: 'app-jog-dial',
  styleUrls: [
    './jog-dial.component.scss'
  ],
  template: `
    <div (appDial)="value = $event">
      <span *ngIf="value">
        {{ value.angle }}
      </span>
    </div>
  `
})
export class JogDialComponent {
  public value: any;
}
