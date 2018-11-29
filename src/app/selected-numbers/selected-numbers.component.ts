import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-selected-numbers',
  templateUrl: './selected-numbers.component.html',
  styleUrls: ['./selected-numbers.component.scss']
})
export class SelectedNumbersComponent implements OnInit {

  private numbers = [{}, {}, {}, {}, {}, {}];

  constructor() {
  }

  ngOnInit() {
  }

}
