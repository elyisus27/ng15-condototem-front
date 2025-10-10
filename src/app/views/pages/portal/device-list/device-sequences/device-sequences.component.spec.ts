import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSequencesComponent } from './device-sequences.component';

describe('DeviceSequencesComponent', () => {
  let component: DeviceSequencesComponent;
  let fixture: ComponentFixture<DeviceSequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSequencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
