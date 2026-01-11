export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any, row: any) => string;
}

export interface TableConfig {
  columns: TableColumn[];
  data: any[];
  pagination?: {
    enabled: boolean;
    pageSize: number;
    currentPage: number;
    totalItems: number;
  };
  sorting?: {
    enabled: boolean;
    column?: string;
    direction?: 'asc' | 'desc';
  };
  filtering?: {
    enabled: boolean;
    filters: { [key: string]: any };
  };
  selectable?: boolean;
  selectedRows?: any[];
  actions?: TableAction[];
}

export interface TableAction {
  label: string;
  icon?: string;
  callback: (row: any) => void;
  condition?: (row: any) => boolean;
}

export interface TableState {
  config: TableConfig;
  loading: boolean;
  error: string | null;
}
