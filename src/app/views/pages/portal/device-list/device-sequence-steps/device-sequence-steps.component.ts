import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-device-sequence-steps',
  templateUrl: './device-sequence-steps.component.html',
})
export class DeviceSequenceStepsComponent {
  @Input() steps: any[] = [];
  @Output() stepsChange = new EventEmitter<any[]>();

  addStep() {
    const nextOrder = this.steps.length + 1;
    this.steps.push({
      order: nextOrder,
      type: 1,
      x1: null, y1: null, x2: null, y2: null,
      swapTime: null,
      delay: 1000,
    });
    this.stepsChange.emit(this.steps);
  }

  removeStep(index: number) {
    this.steps.splice(index, 1);
    this.stepsChange.emit(this.steps);
  }

  
}
