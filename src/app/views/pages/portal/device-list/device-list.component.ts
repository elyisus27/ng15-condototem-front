import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../../../../_services/device.service';
import { SmartDatatableComponent } from '../../../../avanza/components/smart-datatable/smart-datatable.component';
import { DataTableAction } from '../../../../avanza/components/smart-datatable/smart-datatable.interfaces';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  @ViewChild(SmartDatatableComponent) table!: SmartDatatableComponent;

  isModalOpen = false;
  isSaving = false;

  selectedDevice: any = this.createEmptyDevice();
  //selectedDevice:any

  showScreenshotModal = false;
  screenshotSrc: string | null = null;
  isLoadingScreenshot = false;

  url = `${environment.API_URL}/devices/listPaginated`;

  columns = [
    { name: 'deviceId', title: 'Id', width: '60px' },
    { name: 'deviceName', title: 'Nombre', width: '150px' },
    { name: 'description', title: 'Descripción', width: '180px' },
    { name: 'adbDevice', title: 'Num Serie', width: '180px' },
  ];

  actions: DataTableAction[] = [
    { icon: 'cil-pencil', label: '', tooltip: 'Editar', fn: (row: any) => this.openEditModal(row) },
    { icon: 'cil-trash', label: '', tooltip: 'Eliminar', color: 'danger', fn: (row: any) => this.delete(row) },
    { icon: 'cil-print', label: '', tooltip: 'ScreenShot', color: 'secondary', fn: (row: any) => this.openScreenshotModal(row) },
    { icon: 'cil-factory-slash', label: '', tooltip: 'Detener Automatismo', color: 'secondary', fn: (row: any) => this.handleClick },
    { icon: 'cil-factory', label: '', tooltip: 'Iniciar Automatizmo', color: 'secondary', fn: (row: any) => this.handleClick }
    // { icon: 'cil-report-slash', label: '', tooltip: 'Apagar Servicios', color: 'secondary',fn:(row:any)=> this.handleClick },
    // { icon: 'cil-report-slash', label: '', tooltip: 'Apagar Servicios', color: 'secondary',fn:(row:any)=> this.handleClick },
  ];

  constructor(private service: DeviceService) { }

  ngOnInit(): void { }

  private createEmptyDevice() {
    return {
      deviceId: null,
      deviceName: '',
      description: '',
      adbDevice: '',
      sequences: [{ name: "GoToCamera" }, { name: "Aceptar" }, { name: "Denegar" }]
    };
  }

  openDeviceModal(): void {
    this.selectedDevice = this.createEmptyDevice();
    this.isModalOpen = true;
  }

  openEditModal(row: any): void {
    
    this.selectedDevice = row;
    console.log('selecteddev en openmodal', this.selectedDevice)
    this.isModalOpen = true;
  }

  closeDeviceModal(): void {
    setTimeout(() => {
      this.isModalOpen = false;
      if (this.table) this.table.reload();
    }, 0);
  }

  saveDevice(): void {
    this.isSaving = true;
    this.service.saveDevice(this.selectedDevice).subscribe({
      next: (res: any) => {
        console.log('Guardado correctamente:', res);
        this.closeDeviceModal();
        if (this.table) this.table.reload();
      },
      error: (err: any) => {
        console.error('Error al guardar:', err);
      },
      complete: () => {
        this.isSaving = false;
      }
    });
  }

  delete(row: any): void {
    if (!confirm(`¿Seguro que deseas eliminar "${row.deviceName}"?`)) return;
    this.service.deleteDevice(row.deviceId).subscribe({
      next: () => this.table.reload(),
      error: err => console.error('Error al eliminar:', err)
    });
  }

  handleClick(event: any) {
    console.log('click row', event);
  }


  openScreenshotModal(row: any): void {
    const serial = row.adbDevice;
    if (!serial) {
      console.warn('No se encontró número de serie en el registro');
      return;
    }

    this.isLoadingScreenshot = true;
    this.screenshotSrc = null;
    this.showScreenshotModal = true;

    this.service.getScreenshot(serial).subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.screenshotSrc = `data:image/png;base64,${res.data}`;
        } else {
          console.warn('Respuesta sin imagen:', res);
        }
      },
      error: (err) => {
        console.error('Error obteniendo captura:', err);
      },
      complete: () => {
        this.isLoadingScreenshot = false;
      }
    });
  }

  closeScreenshotModal(): void {
    this.showScreenshotModal = false;
    this.screenshotSrc = null;
  }
}
