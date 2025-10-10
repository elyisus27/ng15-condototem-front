import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeviceService } from '../../../../../_services/device.service';



@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',

})
export class DeviceModalComponent {
  @Input() visible: boolean = true;
  @Input() device: any;
  @Output() close = new EventEmitter<void>();

  deviceForm: FormGroup;
  currentSequences: any[] = [];

  constructor(private fb: FormBuilder, private service: DeviceService) {

    console.log('En modal', this.device)
    this.deviceForm = this.fb.group({
      name: [''],
      description: [''],
      adbDevice: [''],

    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['device'] && this.device) {
      this.deviceForm.patchValue({
        name: this.device.deviceName, // Mapeo: device.deviceName -> FormControl 'name'
        description: this.device.description,
        adbDevice: this.device.adbDevice
      });
      this.currentSequences = this.device.sequences ? [...this.device.sequences] : [];
    }
  }

  updateSequences(sequences: any[]) {
    // Cuando el componente hijo (app-device-sequences) emite un cambio,
    // actualizamos la referencia local.
    this.currentSequences = sequences;
    console.log('Secuencias actualizadas en el modal:', this.currentSequences);
  }

  saveDevice() {
    // 1. Obtener valores del formulario de nivel superior
    const formValues = this.deviceForm.value;

    // 2. Crear el objeto final combinando todo
    const savedData = {
      // Tomamos las propiedades que NO se editan en el formulario
      deviceId: this.device.deviceId,
      tagActive: this.device.tagActive,
      tagDelete: this.device.tagDelete,
      // Mapeamos los campos del formulario de nuevo al nombre original del JSON
      deviceName: formValues.name,
      description: formValues.description,
      adbDevice: formValues.adbDevice,
      // 3. Añadimos el arreglo de secuencias anidadas
      sequences: this.currentSequences
    };

    console.log('Objeto completo a enviar al backend:', savedData);

    // Ahora enviamos el objeto `savedData` completo
    this.service.saveDevice(savedData).subscribe({
      next: (res: any) => {
        console.log('Guardado correctamente:', res);
        this.close.emit();
      },
      error: (err: any) => {
        console.error('Error al guardar:', err);
      },
    });

    // Nota: Es mejor emitir `this.close.emit()` dentro del `next` o `complete`
    // del observable si el guardado es exitoso.
    // this.close.emit(); // Lo elimino de aquí para esperar la respuesta del servicio
  }

  // Opcional: Para manejar el evento de cambio de visibilidad que emite c-modal
  handleVisibleChange(newVisible: boolean) {
    // Si el modal se cierra internamente (ej: al presionar ESC), CoreUI
    // emite un evento que debemos propagar al padre
    if (!newVisible) {
      this.close.emit();
    }
  }
}