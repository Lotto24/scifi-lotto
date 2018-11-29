import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {DialPosition} from '../input/dial.directive';

@Component({
  selector: 'app-hud-ring',
  templateUrl: './hud-ring.component.html',
  styleUrls: ['./hud-ring.component.scss']
})
export class HudRingComponent implements OnInit {
  @Input() public dialPosition: DialPosition = {deg: 0, percentage: 0};
  @Output() public numberSelected = new EventEmitter();

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    fromEvent(window, 'deviceorientation')
      .subscribe((event: DeviceOrientationEvent) => {

        const maxYOffset = 30;
        const beta = easeOutQuad((event.beta - 45) / 180) * maxYOffset;
        const offsetY1 = beta * 4;
        const offsetY2 = beta * 3;
        const offsetY3 = beta * 2;
        const offsetY4 = beta;

        const maxXOffset = 15;
        const gamma = easeOutQuad(event.gamma / 180) * maxXOffset;
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

  public onNumberClicked(): void {
    console.log('foo')
    this.numberSelected.emit(this.positionToValue(this.dialPosition));
  }

  public positionToValue(pos: DialPosition): number {
    return this.toValues(pos.percentage, 1, 49);
  }

  private toValues(percentage: number, min: number, max: number): number {
    return Math.round(percentage * (max - min) + min);
  }
}

function easeOutQuad(t) {
  return t * (2 - t);
}
