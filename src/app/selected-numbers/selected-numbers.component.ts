import {Component, OnInit} from '@angular/core';

export interface NumberSlot {
  number?: number;
}

@Component({
  selector: 'app-selected-numbers',
  templateUrl: './selected-numbers.component.html',
  styleUrls: ['./selected-numbers.component.scss']
})
export class SelectedNumbersComponent {

  public numbers: NumberSlot[] = [{}, {}, {}, {}, {}, {}];

  public selectNumber(n: number) {
    console.log(n);
    const emptySlots = this.numbers
      .filter((slot) => !slot.hasOwnProperty('number'));

    if (emptySlots.length > 0) {
      emptySlots.shift().number = n;
    }
  }
}
