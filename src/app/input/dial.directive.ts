import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {fromEvent, merge, Observable} from 'rxjs';
import {concatMap, distinctUntilChanged, map, takeUntil, tap} from 'rxjs/operators';

@Directive({
  selector: '[appDial]'
})
export class DialDirective implements OnInit {
  @Output() public appDial: EventEmitter<number> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    // noop
  }

  public ngOnInit(): void {
    this.offset$()
      .pipe(
        map((deg) => (deg / 360)), // percentage
        map((value) => this.toValues(value, 1, 49)),
        distinctUntilChanged()
      )
      .subscribe((value: number) => this.appDial.next(value));
  }

  private get target(): HTMLElement {
    return this.elRef.nativeElement as HTMLElement;
  }

  private offset$(): Observable<number> {
    return this.start$()
      .pipe(
        concatMap((start) => {
          return this.move$()
            .pipe(
              takeUntil(this.stop$()),
              map((current) => this.toAngle(current.x, current.y))
            );
        })
      );
  }

  private toValues(percentage: number, min: number, max: number): number {
    return Math.round(percentage * (max - min) + min);
  }

  private toAngle(x: number, y: number): number {
    return (this.toDegrees(Math.atan2(y, x)) + 450) % 360;
  }

  private toDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  private start$(): Observable<WebKitPoint> {
    return merge(
        fromEvent(this.target, 'mousedown')
      )
      .pipe(
        map((ev: MouseEvent) => ({x: ev.x, y: ev.y}) as WebKitPoint ),
        tap(() => console.log('start')),
        map(this.toCenter.bind(this))
      );
  }

  private move$(): Observable<WebKitPoint> {
    return fromEvent(this.target, 'mousemove')
      .pipe(
        // tap(() => console.log('move')),
        map((ev: MouseEvent) => ({x: ev.x, y: ev.y}) as WebKitPoint ),
        map(this.toCenter.bind(this))
      );
  }

  private toCenter(point: WebKitPoint): WebKitPoint {
    return {
      x: point.x - this.target.offsetWidth / 2,
      y: point.y - this.target.offsetHeight / 2
    };
  }

  private stop$(): Observable<void> {
    return merge(
        fromEvent(this.target, 'mouseup'),
        fromEvent(this.target, 'mouseleave')
      )
      .pipe(
        tap(() => console.log('stop')),
        map(() => null)
      );
  }
}
