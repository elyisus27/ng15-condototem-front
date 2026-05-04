import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { DataTableColumn, DataTableResponse, DataTableAction } from './smart-datatable.interfaces';

type SortDirection = 'asc' | 'desc' | '';

@Component({
  selector: 'smart-datatable',
  templateUrl: './smart-datatable.component.html',
  styleUrls: ['./smart-datatable.component.scss']
})
export class SmartDatatableComponent implements OnInit {

  @Input() columns: DataTableColumn[] = [];
  @Input() url = '';
  @Input() actions: DataTableAction[] = [];
  @Input() filters: any = {};
  @Input() remote = true;
  @Input() pageSizeOptions: number[] = [10, 25, 50];
  @Input() pageSize = 10;
  @Input() sortEnabled = true;
  @Input() remoteSort = false;
  @Input() sortFieldParam = 'sortField';
  @Input() sortDirectionParam = 'sortDirection';
  @Input() sortColumn = '';
  @Input() sortDirection: SortDirection = '';

  @Output() rowClick = new EventEmitter<any>();
  @Output() rowDblClick = new EventEmitter<any>();

  data$ = new BehaviorSubject<any[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  totalItems = 0;
  currentPage = 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.remote) this.fetchData();
    else this.data$.next([]); // puedes usar datos locales también
  }

  fetchData(): void {
    this.loading$.next(true);

    let params = new HttpParams()
      .set('limit', this.pageSize.toString())
      .set('page', this.currentPage.toString())
      .set('searchtxt', this.filters.searchtxt || '')
      .set('start', this.filters.start || '2020-01-01')
      .set('end', this.filters.end || '2050-01-01')
      //.set('showInactives', this.filters.showInactives ? 'true' : 'false');
      .set('showInactives', 'true');

    if (this.remoteSort && this.sortColumn && this.sortDirection) {
      params = params
        .set(this.sortFieldParam, this.sortColumn)
        .set(this.sortDirectionParam, this.sortDirection);
    }

    this.http.get<any>(this.url, { params }).pipe(
      
      tap(res => {
        const items = res.data.items || [];
        this.data$.next(this.remoteSort ? items : this.sortRows(items));
        this.totalItems = res.data.totalItems || 0;
      }),
      catchError(() => {
        this.data$.next([]);
        this.totalItems = 0;
        return of();
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe();
  }

  reload(): void {
  this.currentPage = 1; // opcional: reinicia la página
  this.fetchData();
}

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onRowDblClick(row: any) {
    this.rowDblClick.emit(row);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchData();
  }

  onPageSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize = +value;
    this.currentPage = 1;
    this.fetchData();
  }

  onSort(column: DataTableColumn): void {
    if (!this.isSortable(column)) return;

    const nextColumn = column.sortField || column.name;

    if (this.sortColumn !== nextColumn) {
      this.sortColumn = nextColumn;
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else if (this.sortDirection === 'desc') {
      this.sortDirection = '';
      this.sortColumn = '';
    } else {
      this.sortDirection = 'asc';
    }

    this.currentPage = 1;

    if (this.remoteSort) {
      this.fetchData();
      return;
    }

    this.data$.next(this.sortRows(this.data$.value));
  }

  isSortable(column: DataTableColumn): boolean {
    return this.sortEnabled && column.sortable !== false;
  }

  isSorted(column: DataTableColumn): boolean {
    return this.sortColumn === (column.sortField || column.name) && !!this.sortDirection;
  }

  private sortRows(rows: any[]): any[] {
    if (!this.sortColumn || !this.sortDirection) return rows;

    return [...rows].sort((a, b) => {
      const aValue = this.getValue(a, this.sortColumn);
      const bValue = this.getValue(b, this.sortColumn);
      const comparison = this.compareValues(aValue, bValue);

      return this.sortDirection === 'asc' ? comparison : comparison * -1;
    });
  }

  private compareValues(aValue: any, bValue: any): number {
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return -1;
    if (bValue == null) return 1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return String(aValue).localeCompare(String(bValue), undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }

  private getValue(row: any, field: string): any {
    return field.split('.').reduce((value, key) => value?.[key], row);
  }

  actionClicked(action: DataTableAction, row: any) {
    if (action.fn) action.fn(row);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }


//   filters: any = {
//   searchtxt: '',
//   start: '2020-01-01',
//   end: '2050-01-01',
//   showInactives: false
// };

}

