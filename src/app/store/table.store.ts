import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { TableState, TableConfig, TableColumn } from '@models/table.model';

const initialState: TableState = {
  config: {
    columns: [],
    data: [],
    pagination: {
      enabled: false,
      pageSize: 10,
      currentPage: 1,
      totalItems: 0,
    },
    sorting: {
      enabled: false,
    },
    filtering: {
      enabled: false,
      filters: {},
    },
    selectable: false,
    selectedRows: [],
    actions: [],
  },
  loading: false,
  error: null,
};

export const TableStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const paginatedData = computed(() => {
      const config = store.config();
      let data = [...config.data];

      // Apply filters
      if (config.filtering?.enabled && config.filtering.filters) {
        Object.entries(config.filtering.filters).forEach(([key, value]) => {
          if (value) {
            data = data.filter((row) =>
              String(row[key]).toLowerCase().includes(String(value).toLowerCase())
            );
          }
        });
      }

      // Apply sorting
      if (config.sorting?.enabled && config.sorting.column) {
        const column = config.sorting.column;
        const direction = config.sorting.direction || 'asc';

        data.sort((a, b) => {
          const aVal = a[column];
          const bVal = b[column];

          if (aVal < bVal) return direction === 'asc' ? -1 : 1;
          if (aVal > bVal) return direction === 'asc' ? 1 : -1;
          return 0;
        });
      }

      // Update total items for pagination
      const totalItems = data.length;

      // Apply pagination
      if (config.pagination?.enabled) {
        const start = (config.pagination.currentPage - 1) * config.pagination.pageSize;
        const end = start + config.pagination.pageSize;
        data = data.slice(start, end);
      }

      return { data, totalItems };
    });

    return {
      paginatedData,
      totalPages: computed(() => {
        const config = store.config();
        if (!config.pagination?.enabled) return 1;
        const paginated = paginatedData();
        return Math.ceil(paginated.totalItems / config.pagination.pageSize);
      }),
      hasSelectedRows: computed(() => {
        return (store.config().selectedRows?.length ?? 0) > 0;
      }),
    };
  }),
  withMethods((store) => ({
    // Initialize table
    initializeTable(config: Partial<TableConfig>) {
      const currentConfig = store.config();
      const newConfig = {
        ...currentConfig,
        ...config,
        pagination: {
          ...currentConfig.pagination,
          ...(config.pagination || {}),
        },
        sorting: {
          ...currentConfig.sorting,
          ...(config.sorting || {}),
        },
        filtering: {
          ...currentConfig.filtering,
          ...(config.filtering || {}),
        },
      };

      return {
        config: newConfig as TableConfig,
        loading: false,
        error: null,
      };
    },

    // Set table data
    setData(data: any[]) {
      const config = store.config();
      const totalItems = data.length;

      return {
        config: {
          ...config,
          data,
          pagination: config.pagination
            ? { ...config.pagination, totalItems }
            : undefined,
        },
      };
    },

    // Update sorting
    updateSorting(column: string) {
      const config = store.config();
      const currentSorting = config.sorting;

      let direction: 'asc' | 'desc' = 'asc';

      if (currentSorting?.column === column) {
        direction = currentSorting.direction === 'asc' ? 'desc' : 'asc';
      }

      return {
        config: {
          ...config,
          sorting: {
            ...currentSorting,
            column,
            direction,
          },
        },
      };
    },

    // Update filter
    updateFilter(column: string, value: any) {
      const config = store.config();
      const filters = { ...config.filtering?.filters, [column]: value };

      return {
        config: {
          ...config,
          filtering: {
            ...config.filtering,
            filters,
          },
          pagination: config.pagination
            ? { ...config.pagination, currentPage: 1 }
            : undefined,
        },
      };
    },

    // Clear filters
    clearFilters() {
      const config = store.config();

      return {
        config: {
          ...config,
          filtering: {
            ...config.filtering,
            filters: {},
          },
          pagination: config.pagination
            ? { ...config.pagination, currentPage: 1 }
            : undefined,
        },
      };
    },

    // Go to page
    goToPage(page: number) {
      const config = store.config();

      if (!config.pagination) return {};

      const totalPages = Math.ceil(
        config.pagination.totalItems / config.pagination.pageSize
      );

      if (page < 1 || page > totalPages) return {};

      return {
        config: {
          ...config,
          pagination: {
            ...config.pagination,
            currentPage: page,
          },
        },
      };
    },

    // Change page size
    changePageSize(pageSize: number) {
      const config = store.config();

      if (!config.pagination) return {};

      return {
        config: {
          ...config,
          pagination: {
            ...config.pagination,
            pageSize,
            currentPage: 1,
          },
        },
      };
    },

    // Select row
    selectRow(row: any) {
      const config = store.config();
      const selectedRows = [...(config.selectedRows || [])];

      const index = selectedRows.findIndex((r) => r === row);

      if (index > -1) {
        selectedRows.splice(index, 1);
      } else {
        selectedRows.push(row);
      }

      return {
        config: {
          ...config,
          selectedRows,
        },
      };
    },

    // Select all rows
    selectAllRows(selected: boolean) {
      const config = store.config();

      return {
        config: {
          ...config,
          selectedRows: selected ? [...store.paginatedData().data] : [],
        },
      };
    },

    // Clear selection
    clearSelection() {
      const config = store.config();

      return {
        config: {
          ...config,
          selectedRows: [],
        },
      };
    },

    // Set loading
    setLoading(loading: boolean) {
      return { loading };
    },

    // Set error
    setError(error: string | null) {
      return { error };
    },
  }))
);
