import {Component, ElementRef, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-hud-ring',
  templateUrl: './hud-ring.component.html',
  styleUrls: ['./hud-ring.component.scss']
})
export class HudRingComponent implements OnInit {

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    fromEvent(window, 'deviceorientation')
      .subscribe((event: DeviceOrientationEvent) => {

        const beta = event.beta;
        const offsetY1 = beta * 4;
        const offsetY2 = beta * 3;
        const offsetY3 = beta * 2;
        const offsetY4 = beta;

        const gamma = event.gamma * 0.5;
        const offsetX1 = gamma * 4;
        const offsetX2 = gamma * 3;
        const offsetX3 = gamma * 2;
        const offsetX4 = gamma;

        this.elRef.nativeElement.style.setProperty('--ring-1-y-offset', offsetY1 + 'px');
        this.elRef.nativeElement.style.setProperty('--ring-2-y-offset', offsetY2 + 'px');
        this.elRef.nativeElement.style.setProperty('--ring-3-y-offset', offsetY3 + 'px');
        this.elRef.nativeElement.style.setProperty('--ring-4-y-offset', offsetY4 + 'px');

        this.elRef.nativeElement.style.setProperty('--ring-1-x-offset', offsetX1 + 'px');
        this.elRef.nativeElement.style.setProperty('--ring-2-x-offset', offsetX2 + 'px');
        this.elRef.nativeElement.style.setProperty('--ring-3-x-offset', offsetX3 + 'px');
        this.elRef.nativeElement.style.setProperty('--ring-4-x-offset', offsetX4 + 'px');

      });
  }

}
