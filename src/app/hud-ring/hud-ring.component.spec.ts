import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudRingComponent } from './hud-ring.component';

describe('HudRingComponent', () => {
  let component: HudRingComponent;
  let fixture: ComponentFixture<HudRingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudRingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
