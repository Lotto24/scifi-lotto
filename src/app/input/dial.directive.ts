import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

export interface DialEvent {
  type: 'start' | 'move' | 'end';
  angle: number;
}

@Directive({
  selector: '[appDial]'
})
export class DialDirective implements OnInit {
  @Output() public appDial: EventEmitter<DialEvent> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    // noop
  }

  public ngOnInit(): void {

    this.appDial.next({ type: 'move', angle: 45 });
  }
}
