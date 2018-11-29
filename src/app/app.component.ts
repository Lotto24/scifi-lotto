import {Component, ViewChild} from '@angular/core';
import {DialPosition} from './input/dial.directive';
import {SelectedNumbersComponent} from './selected-numbers/selected-numbers.component';

@Component({
  selector: 'app-root',
  template: `
    <img class="logo" src="../assets/logo.png" alt="Lazer Unicorn Lotto">
    <div class="page">
      <app-hud-ring (appDial)="position = $event"
                    (numberSelected)="onNumberSelected($event)"
                    [dialPosition]="position">
      </app-hud-ring>
      <app-selected-numbers></app-selected-numbers>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'scifi-lotto';
  public position: DialPosition = {deg: 0, percentage: 0};

  @ViewChild(SelectedNumbersComponent)
  public selectedNumbers: SelectedNumbersComponent;

  public onNumberSelected(n: number): void {
    this.selectedNumbers.selectNumber(n);
  }
}
