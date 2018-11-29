import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="page">
      <app-hud-ring (appDial)="value = $event">
        <span *ngIf="value" [textContent]="value"></span>
      </app-hud-ring>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'scifi-lotto';
  public value: number;
}
