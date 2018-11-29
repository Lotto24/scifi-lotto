import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {fromEvent, merge, Observable} from 'rxjs';
import {concatMap, map, takeUntil, tap} from 'rxjs/operators';

export interface DialPosition {
  deg: number;
  percentage: number;
}

@Directive({
  selector: '[appDial]'
})
export class DialDirective implements OnInit {
  @Output() public appDial: EventEmitter<DialPosition> = new EventEmitter();

  public dialPosition = 0;

  constructor(private elRef: ElementRef) {
    // noop
  }

  public ngOnInit(): void {
    this.offset$()
      .pipe(
        map((deg) => {
          const percentage = deg / 360;
          return {
            deg,
            percentage
          } as DialPosition;
        })
      )
      .subscribe((pos: DialPosition) => this.appDial.next(pos));
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

  private toAngle(x: number, y: number): number {
    return (this.toDegrees(Math.atan2(y, x)) + 450) % 360;
  }

  private toDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  private start$(): Observable<WebKitPoint> {
    return merge(this.mouseStart$(), this.touchStart$())
      .pipe(
        tap(() => console.log('start')),
        map(this.toCenter.bind(this))
      );
  }

  private touchStart$(): Observable<WebKitPoint> {
    return fromEvent(this.target, 'touchstart')
      .pipe(
        map((ev: TouchEvent) => ev.touches[0]),
        map((touch: Touch) => ({x: touch.pageX, y: touch.pageY}) as WebKitPoint)
      );
  }

  private mouseStart$(): Observable<WebKitPoint> {
    return fromEvent(this.target, 'mousedown')
      .pipe(
        map((ev: MouseEvent) => ({x: ev.x, y: ev.y}) as WebKitPoint)
      );
  }

  private move$(): Observable<WebKitPoint> {
    return merge(this.mouseMove$(), this.touchMove$())
      .pipe(map(this.toCenter.bind(this)));
  }

  private mouseMove$(): Observable<WebKitPoint> {
    return fromEvent(this.target, 'mousemove')
      .pipe(
        // tap(() => console.log('move')),
        map((ev: MouseEvent) => ({x: ev.x, y: ev.y}) as WebKitPoint)
      );
  }

  private touchMove$(): Observable<WebKitPoint> {
    return fromEvent(this.target, 'touchmove')
      .pipe(
        map((ev: TouchEvent) => ev.touches[0]),
        map((touch: Touch) => ({x: touch.pageX, y: touch.pageY}) as WebKitPoint)
      );
  }

  private toCenter(point: WebKitPoint): WebKitPoint {
    return {
      x: point.x - this.target.offsetWidth / 2,
      y: point.y - this.target.offsetHeight / 2
    };
  }

  private stop$(): Observable<void> {
    return merge(this.mouseStop$(), this.touchStop$())
      .pipe(map(() => null));
  }

  private touchStop$(): Observable<any> {
    return fromEvent(this.target, 'touchend');
  }

  private mouseStop$(): Observable<any> {
    return merge(
      fromEvent(this.target, 'mouseup'),
      fromEvent(this.target, 'mouseleave')
    );
  }
}
