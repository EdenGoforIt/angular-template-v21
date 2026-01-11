import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@shared/components/dynamic-table/dynamic-table.component';
import { TableStore } from '@store/table.store';
import { TableColumn } from '@models/table.model';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  salary: number;
  joinDate: string;
  active: boolean;
}

@Component({
  selector: 'app-table-example',
  standalone: true,
  imports: [CommonModule, DynamicTableComponent],
  template: `
    <div class="page-container">
      <h1>Dynamic Table Example</h1>
      <p class="description">
        This page demonstrates a dynamic table with sorting, filtering, pagination,
        and row selection using SignalStore.
      </p>

      <div class="table-wrapper">
        <div class="table-header">
          <h2>Employee Directory</h2>
          <div class="header-actions">
            <button
              *ngIf="tableStore.hasSelectedRows()"
              (click)="onBulkDelete()"
              class="btn btn-danger"
            >
              Delete Selected ({{ tableStore.config().selectedRows?.length }})
            </button>
            <button (click)="onAddNew()" class="btn btn-primary">
              Add New Employee
            </button>
          </div>
        </div>

        <app-dynamic-table (rowSelect)="onRowSelect($event)" />
      </div>

      <div class="info-panel">
        <h3>Table Features:</h3>
        <ul>
          <li>Sorting: Click on column headers to sort</li>
          <li>Filtering: Use the filter inputs to search</li>
          <li>Pagination: Navigate through pages and adjust page size</li>
          <li>Row Selection: Select individual rows or all rows</li>
          <li>Actions: Perform actions on individual rows</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
      }

      .description {
        color: #6b7280;
        margin-bottom: 2rem;
      }

      .table-wrapper {
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
      }

      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
      }

      .btn {
        padding: 0.5rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }

      .btn-primary {
        background-color: #3b82f6;
        color: white;
      }

      .btn-primary:hover {
        background-color: #2563eb;
      }

      .btn-danger {
        background-color: #ef4444;
        color: white;
      }

      .btn-danger:hover {
        background-color: #dc2626;
      }

      .info-panel {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      ul {
        list-style-type: disc;
        padding-left: 1.5rem;
        color: #4b5563;
      }

      li {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class TableExampleComponent {
  tableStore = inject(TableStore);

  private sampleData: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      age: 32,
      department: 'Engineering',
      salary: 95000,
      joinDate: '2020-03-15',
      active: true,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      age: 28,
      department: 'Marketing',
      salary: 75000,
      joinDate: '2021-06-20',
      active: true,
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@company.com',
      age: 45,
      department: 'Sales',
      salary: 85000,
      joinDate: '2018-01-10',
      active: true,
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@company.com',
      age: 35,
      department: 'Engineering',
      salary: 105000,
      joinDate: '2019-09-05',
      active: true,
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@company.com',
      age: 29,
      department: 'HR',
      salary: 70000,
      joinDate: '2022-02-14',
      active: true,
    },
    {
      id: 6,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      age: 31,
      department: 'Finance',
      salary: 90000,
      joinDate: '2020-11-22',
      active: false,
    },
    {
      id: 7,
      firstName: 'Robert',
      lastName: 'Miller',
      email: 'robert.miller@company.com',
      age: 42,
      department: 'Engineering',
      salary: 115000,
      joinDate: '2017-05-30',
      active: true,
    },
    {
      id: 8,
      firstName: 'Lisa',
      lastName: 'Wilson',
      email: 'lisa.wilson@company.com',
      age: 26,
      department: 'Marketing',
      salary: 68000,
      joinDate: '2023-01-08',
      active: true,
    },
    {
      id: 9,
      firstName: 'James',
      lastName: 'Taylor',
      email: 'james.taylor@company.com',
      age: 38,
      department: 'Sales',
      salary: 92000,
      joinDate: '2019-07-12',
      active: true,
    },
    {
      id: 10,
      firstName: 'Amanda',
      lastName: 'Anderson',
      email: 'amanda.anderson@company.com',
      age: 33,
      department: 'HR',
      salary: 78000,
      joinDate: '2021-04-18',
      active: true,
    },
    {
      id: 11,
      firstName: 'Chris',
      lastName: 'Martinez',
      email: 'chris.martinez@company.com',
      age: 30,
      department: 'Engineering',
      salary: 98000,
      joinDate: '2020-08-25',
      active: true,
    },
    {
      id: 12,
      firstName: 'Jessica',
      lastName: 'Garcia',
      email: 'jessica.garcia@company.com',
      age: 27,
      department: 'Finance',
      salary: 72000,
      joinDate: '2022-10-03',
      active: true,
    },
  ];

  private columns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      width: '80px',
      type: 'number',
    },
    {
      key: 'firstName',
      label: 'First Name',
      sortable: true,
      filterable: true,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      sortable: true,
      filterable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      filterable: true,
    },
    {
      key: 'age',
      label: 'Age',
      sortable: true,
      width: '80px',
      type: 'number',
      align: 'center',
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      filterable: true,
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      width: '120px',
      type: 'number',
      align: 'right',
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      type: 'date',
      width: '120px',
    },
    {
      key: 'active',
      label: 'Status',
      sortable: true,
      width: '100px',
      type: 'boolean',
      align: 'center',
      formatter: (value: boolean) => (value ? 'Active' : 'Inactive'),
    },
  ];

  constructor() {
    effect(
      () => {
        this.tableStore.initializeTable({
          columns: this.columns,
          data: this.sampleData,
          pagination: {
            enabled: true,
            pageSize: 10,
            currentPage: 1,
            totalItems: this.sampleData.length,
          },
          sorting: {
            enabled: true,
            column: 'id',
            direction: 'asc',
          },
          filtering: {
            enabled: true,
            filters: {},
          },
          selectable: true,
          selectedRows: [],
          actions: [
            {
              label: 'Edit',
              icon: '✏️',
              callback: (row: User) => this.onEdit(row),
            },
            {
              label: 'Delete',
              icon: '🗑️',
              callback: (row: User) => this.onDelete(row),
            },
            {
              label: 'View',
              icon: '👁️',
              callback: (row: User) => this.onView(row),
            },
          ],
        });
      },
      { allowSignalWrites: true }
    );
  }

  onRowSelect(row: User): void {
    console.log('Row selected:', row);
  }

  onEdit(row: User): void {
    console.log('Edit user:', row);
    alert(`Editing user: ${row.firstName} ${row.lastName}`);
  }

  onDelete(row: User): void {
    console.log('Delete user:', row);
    if (confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      alert('User deleted (demo only)');
    }
  }

  onView(row: User): void {
    console.log('View user:', row);
    alert(`Viewing details for: ${row.firstName} ${row.lastName}`);
  }

  onBulkDelete(): void {
    const selectedCount = this.tableStore.config().selectedRows?.length || 0;
    if (
      confirm(
        `Are you sure you want to delete ${selectedCount} selected employee(s)?`
      )
    ) {
      this.tableStore.clearSelection();
      alert('Selected employees deleted (demo only)');
    }
  }

  onAddNew(): void {
    alert('Add new employee form would open here');
  }
}
