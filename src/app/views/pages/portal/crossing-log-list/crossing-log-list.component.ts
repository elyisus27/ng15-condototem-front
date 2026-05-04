import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SmartDatatableComponent } from '../../../../avanza/components/smart-datatable/smart-datatable.component';
import { DataTableColumn } from '../../../../avanza/components/smart-datatable/smart-datatable.interfaces';

@Component({
  selector: 'app-crossing-log-list',
  templateUrl: './crossing-log-list.component.html',
  styleUrls: ['./crossing-log-list.component.scss']
})
export class CrossingLogListComponent implements OnInit {
  @ViewChild(SmartDatatableComponent) table!: SmartDatatableComponent;

  url = `${environment.API_URL}/devices/crossing-log/listPaginated`;
  dt1 = '';
  dt2 = '';
  searchtxt = '';
  filters: any = {
    searchtxt: '',
    start: '',
    end: '',
    showInactives: false
  };

  columns: DataTableColumn[] = [
    //{ name: 'id', title: 'Id', width: '70px' },
    { name: 'crossingAt', title: 'Fecha', width: '180px' },
    { name: 'state', title: 'Estado', width: '140px' },
    { name: 'hostName', title: 'Anfitrion', width: '280px' },
    { name: 'hostUnit', title: 'Unidad', width: '120px' },
    //{ name: 'co_host', title: 'Co-anfitrion', width: '180px' },
    { name: 'visitorName', title: 'Visitante', width: '180px' },
    { name: 'visitorPhone', title: 'Telefono', width: '140px' },
    //{ name: 'visitor_email', title: 'Correo', width: '220px' },
    { name: 'visitType', title: 'Tipo visita', width: '150px' },
  ];

  ngOnInit(): void {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.dt1 = this.formatDateInput(firstDayOfMonth);
    this.dt2 = this.formatDateInput(today);
    this.updateFilters();
  }

  onDateChange(): void {
    this.updateFilters();
    this.reloadTable();
  }

  onSearch(): void {
    this.updateFilters();
    this.reloadTable();
  }

  handleClick(event: any): void {
    console.log('click crossing log row', event);
  }

  private updateFilters(): void {
    Object.assign(this.filters, {
      searchtxt: this.searchtxt?.trim() || '',
      start: this.dt1,
      end: this.dt2,
      showInactives: false
    });
  }

  private reloadTable(): void {
    if (this.table) this.table.reload();
  }

  private formatDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
