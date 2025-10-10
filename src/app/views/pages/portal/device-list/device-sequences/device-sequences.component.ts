import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  AccordionButtonDirective,  AccordionComponent,  AccordionItemComponent,  TemplateIdDirective} from '@coreui/angular';

@Component({
  selector: 'app-device-sequences',
  templateUrl: './device-sequences.component.html',
  //standalone: true,
  // imports: [
  //   AccordionComponent,
  //   AccordionItemComponent,
  //   TemplateIdDirective,
  //   AccordionButtonDirective
  // ]
})
export class DeviceSequencesComponent {
  @Input() sequences: any[] = [];
  @Output() sequencesChange = new EventEmitter<any[]>();


  constructor() {  }
  addSequence() {
    this.sequences.push({
      name: 'Nueva Secuencia',
      steps: [],
    });
    this.sequencesChange.emit(this.sequences);
  }

  removeSequence(index: number) {
    this.sequences.splice(index, 1);
    this.sequencesChange.emit(this.sequences);
  }
}
