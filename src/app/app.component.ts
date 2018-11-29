import {Component} from '@angular/core';
import {DialPosition} from './input/dial.directive';

@Component({
  selector: 'app-root',
  template: `
    <div class="page">
      <app-hud-ring (appDial)="position = $event"
                    [dialPosition]="position">
      </app-hud-ring>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'scifi-lotto';
  public position: DialPosition;
}
