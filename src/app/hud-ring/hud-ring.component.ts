import {Component, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-hud-ring',
  templateUrl: './hud-ring.component.html',
  styleUrls: ['./hud-ring.component.scss']
})
export class HudRingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    fromEvent(window, 'deviceorientation')
      .subscribe(console.log);
  }

}
