import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableStore } from '@store/table.store';
import { TableColumn, TableAction } from '@models/table.model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="table-container">
      <!-- Loading State -->
      <div *ngIf="tableStore.loading()" class="loading">Loading...</div>

      <!-- Error State -->
      <div *ngIf="tableStore.error()" class="error">{{ tableStore.error() }}</div>

      <!-- Filters -->
      <div
        *ngIf="tableStore.config().filtering?.enabled"
        class="filters"
      >
        <div *ngFor="let column of filterableColumns()" class="filter-field">
          <label [for]="'filter-' + column.key">{{ column.label }}</label>
          <input
            [id]="'filter-' + column.key"
            type="text"
            [(ngModel)]="filters[column.key]"
            (ngModelChange)="onFilterChange(column.key, $event)"
            placeholder="Filter {{ column.label }}..."
            class="filter-input"
          />
        </div>
        <button
          *ngIf="hasActiveFilters()"
          (click)="clearFilters()"
          class="btn btn-clear"
        >
          Clear Filters
        </button>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th *ngIf="tableStore.config().selectable" class="select-column">
                <input
                  type="checkbox"
                  [checked]="isAllSelected()"
                  (change)="onSelectAll($event)"
                />
              </th>
              <th
                *ngFor="let column of tableStore.config().columns"
                [class.sortable]="column.sortable"
                [style.width]="column.width"
                [style.text-align]="column.align || 'left'"
                (click)="column.sortable && onSort(column.key)"
              >
                {{ column.label }}
                <span
                  *ngIf="
                    column.sortable &&
                    tableStore.config().sorting?.column === column.key
                  "
                  class="sort-icon"
                >
                  {{
                    tableStore.config().sorting?.direction === 'asc' ? '↑' : '↓'
                  }}
                </span>
              </th>
              <th
                *ngIf="tableStore.config().actions && tableStore.config().actions!.length > 0"
                class="actions-column"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngIf="tableStore.paginatedData().data.length === 0">
              <td
                [colSpan]="
                  tableStore.config().columns.length +
                  (tableStore.config().selectable ? 1 : 0) +
                  (tableStore.config().actions?.length ? 1 : 0)
                "
                class="no-data"
              >
                No data available
              </td>
            </tr>
            <tr *ngFor="let row of tableStore.paginatedData().data">
              <td *ngIf="tableStore.config().selectable" class="select-column">
                <input
                  type="checkbox"
                  [checked]="isRowSelected(row)"
                  (change)="onSelectRow(row)"
                />
              </td>
              <td
                *ngFor="let column of tableStore.config().columns"
                [style.text-align]="column.align || 'left'"
              >
                {{ formatCellValue(row, column) }}
              </td>
              <td
                *ngIf="tableStore.config().actions && tableStore.config().actions!.length > 0"
                class="actions-column"
              >
                <button
                  *ngFor="let action of getRowActions(row)"
                  (click)="action.callback(row)"
                  class="btn btn-action"
                  [title]="action.label"
                >
                  {{ action.icon || action.label }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        *ngIf="tableStore.config().pagination?.enabled"
        class="pagination"
      >
        <div class="pagination-info">
          Showing
          {{
            (tableStore.config().pagination!.currentPage - 1) *
              tableStore.config().pagination!.pageSize +
              1
          }}
          to
          {{
            Math.min(
              tableStore.config().pagination!.currentPage *
                tableStore.config().pagination!.pageSize,
              tableStore.paginatedData().totalItems
            )
          }}
          of {{ tableStore.paginatedData().totalItems }} entries
        </div>

        <div class="pagination-controls">
          <button
            (click)="goToPage(1)"
            [disabled]="tableStore.config().pagination!.currentPage === 1"
            class="btn btn-pagination"
          >
            First
          </button>
          <button
            (click)="
              goToPage(tableStore.config().pagination!.currentPage - 1)
            "
            [disabled]="tableStore.config().pagination!.currentPage === 1"
            class="btn btn-pagination"
          >
            Previous
          </button>

          <span class="page-numbers">
            Page {{ tableStore.config().pagination!.currentPage }} of
            {{ tableStore.totalPages() }}
          </span>

          <button
            (click)="
              goToPage(tableStore.config().pagination!.currentPage + 1)
            "
            [disabled]="
              tableStore.config().pagination!.currentPage ===
              tableStore.totalPages()
            "
            class="btn btn-pagination"
          >
            Next
          </button>
          <button
            (click)="goToPage(tableStore.totalPages())"
            [disabled]="
              tableStore.config().pagination!.currentPage ===
              tableStore.totalPages()
            "
            class="btn btn-pagination"
          >
            Last
          </button>
        </div>

        <div class="page-size-selector">
          <label for="pageSize">Items per page:</label>
          <select
            id="pageSize"
            [(ngModel)]="pageSize"
            (ngModelChange)="onPageSizeChange($event)"
            class="page-size-select"
          >
            <option [value]="10">10</option>
            <option [value]="25">25</option>
            <option [value]="50">50</option>
            <option [value]="100">100</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .table-container {
        width: 100%;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      .loading,
      .error {
        padding: 2rem;
        text-align: center;
      }

      .error {
        color: #ef4444;
      }

      .filters {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        flex-wrap: wrap;
        align-items: flex-end;
      }

      .filter-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .filter-field label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
      }

      .filter-input {
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
      }

      .filter-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .table-wrapper {
        overflow-x: auto;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
      }

      .table thead {
        background-color: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
      }

      .table th,
      .table td {
        padding: 0.75rem 1rem;
        text-align: left;
      }

      .table th {
        font-weight: 600;
        color: #374151;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .table th.sortable {
        cursor: pointer;
        user-select: none;
      }

      .table th.sortable:hover {
        background-color: #f3f4f6;
      }

      .sort-icon {
        margin-left: 0.5rem;
      }

      .table tbody tr {
        border-bottom: 1px solid #e5e7eb;
      }

      .table tbody tr:hover {
        background-color: #f9fafb;
      }

      .table td {
        color: #1f2937;
        font-size: 0.875rem;
      }

      .no-data {
        text-align: center;
        color: #6b7280;
        padding: 2rem !important;
      }

      .select-column {
        width: 40px;
        text-align: center !important;
      }

      .actions-column {
        text-align: center !important;
      }

      .btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }

      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .btn-clear {
        background-color: #6b7280;
        color: white;
      }

      .btn-clear:hover:not(:disabled) {
        background-color: #4b5563;
      }

      .btn-action {
        padding: 0.25rem 0.5rem;
        margin: 0 0.25rem;
        background-color: #3b82f6;
        color: white;
      }

      .btn-action:hover:not(:disabled) {
        background-color: #2563eb;
      }

      .btn-pagination {
        padding: 0.5rem 0.75rem;
        background-color: white;
        border: 1px solid #d1d5db;
        color: #374151;
      }

      .btn-pagination:hover:not(:disabled) {
        background-color: #f9fafb;
      }

      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-top: 1px solid #e5e7eb;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .pagination-info {
        color: #6b7280;
        font-size: 0.875rem;
      }

      .pagination-controls {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .page-numbers {
        padding: 0 1rem;
        color: #374151;
        font-size: 0.875rem;
      }

      .page-size-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
      }

      .page-size-select {
        padding: 0.25rem 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
      }
    `,
  ],
})
export class DynamicTableComponent {
  tableStore = inject(TableStore);

  Math = Math;

  filters: { [key: string]: any } = {};
  pageSize: number = 10;

  rowSelect = output<any>();
  rowAction = output<{ action: string; row: any }>();

  constructor() {
    effect(() => {
      if (this.tableStore.config().pagination) {
        this.pageSize = this.tableStore.config().pagination!.pageSize;
      }
    });
  }

  filterableColumns(): TableColumn[] {
    return this.tableStore.config().columns.filter((col) => col.filterable);
  }

  hasActiveFilters(): boolean {
    return Object.values(this.filters).some((value) => value);
  }

  onFilterChange(column: string, value: any): void {
    this.tableStore.updateFilter(column, value);
  }

  clearFilters(): void {
    this.filters = {};
    this.tableStore.clearFilters();
  }

  onSort(column: string): void {
    this.tableStore.updateSorting(column);
  }

  formatCellValue(row: any, column: TableColumn): string {
    const value = row[column.key];

    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }

    if (column.type === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return value ?? '';
  }

  isRowSelected(row: any): boolean {
    return (
      this.tableStore
        .config()
        .selectedRows?.some((r) => JSON.stringify(r) === JSON.stringify(row)) ||
      false
    );
  }

  isAllSelected(): boolean {
    const data = this.tableStore.paginatedData().data;
    const selectedRows = this.tableStore.config().selectedRows || [];
    return data.length > 0 && data.every((row) => this.isRowSelected(row));
  }

  onSelectRow(row: any): void {
    this.tableStore.selectRow(row);
    this.rowSelect.emit(row);
  }

  onSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.tableStore.selectAllRows(checkbox.checked);
  }

  getRowActions(row: any): TableAction[] {
    return (
      this.tableStore
        .config()
        .actions?.filter((action) => !action.condition || action.condition(row)) ||
      []
    );
  }

  goToPage(page: number): void {
    this.tableStore.goToPage(page);
  }

  onPageSizeChange(pageSize: number): void {
    this.tableStore.changePageSize(pageSize);
  }
}
