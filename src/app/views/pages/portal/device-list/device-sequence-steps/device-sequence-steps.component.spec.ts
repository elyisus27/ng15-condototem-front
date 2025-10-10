import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSequenceStepsComponent } from './device-sequence-steps.component';

describe('DeviceSequenceStepsComponent', () => {
  let component: DeviceSequenceStepsComponent;
  let fixture: ComponentFixture<DeviceSequenceStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSequenceStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceSequenceStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
