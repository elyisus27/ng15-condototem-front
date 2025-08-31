import { Component, OnInit, ViewChild } from '@angular/core';
import { CfeService } from '../../../../_services/cfe.service';
import { SmartDatatableComponent } from '../../../../avanza/components/smart-datatable/smart-datatable.component';
import { DataTableAction } from '../../../../avanza/components/smart-datatable/smart-datatable.interfaces';
import { environment } from '../../../../../environments/environment';





@Component({
  selector: 'app-cfe-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  @ViewChild(SmartDatatableComponent) table!: SmartDatatableComponent;

  isUpdatingBalance: boolean = false;
  isRegisteringContracts: boolean = false;
  isLoggingInTelegram: boolean = false; // Nueva flag para el botón de Telegram

  constructor(
    private cfesvc: CfeService
  ) { }

  ngOnInit(): void { }

  url = `${environment.API_URL}/devices/listPaginated`
  columns = [
    { name: 'deviceId', title: 'Id', width: "20px" },
    { name: 'deviceName', title: 'Nombre', width: "80px" },
    { name: 'description', title: 'Descripción', width: "120px" },
    { name: 'adbDevice', title: 'adb - Device', width: "180px" },
    
  ];

  actions: DataTableAction[] = [];

  onEdit(row: any) { console.log('Editando', row); }
  onDelete(row: any) { console.log('Eliminando', row); }
  edit(row: any) { }
  delete(row: any) { }
  toggle(row: any) { }
  handleClick(event: any) { console.log(event) }

  updateBalance(): void {
    this.isUpdatingBalance = true;
    this.cfesvc.getPublicContent().subscribe({
      next: (data: any) => {
        console.log('Datos de adeudos CFE recibidos:', data);
        if (this.table) { this.table.reload(); }
      },
      error: (error: any) => {
        console.error('Error al actualizar adeudos CFE:', error);
      },
      complete: () => {
        this.isUpdatingBalance = false;
      }
    });
  }

  registerContracts(): void {
    this.isRegisteringContracts = true;
    this.cfesvc.registerContracts().subscribe({
      next: (data: any) => {
        console.log('Respuesta de registro de contratos CFE:', data);
        if (this.table) { this.table.reload(); }
      },
      error: (error: any) => {
        console.error('Error al registrar contratos CFE:', error);
      },
      complete: () => {
        this.isRegisteringContracts = false;
      }
    });
  }

  // Nuevo método para simular el inicio de sesión en Telegram
  loginTelegram(): void {
    this.isLoggingInTelegram = true;
    this.cfesvc.initTelegram().subscribe({
      next: (data: any) => {
        console.log('Respuesta de registro de contratos CFE:', data);
        if (this.table) { this.table.reload(); }
      },
      error: (error: any) => {
        console.error('Error al registrar contratos CFE:', error);
      },
      complete: () => {
        this.isLoggingInTelegram = false;
      }
    });
  }
}
