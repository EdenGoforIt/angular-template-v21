export type FormFieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  email?: boolean;
  custom?: (value: any) => boolean;
}

export interface SelectOption {
  label: string;
  value: any;
}

export interface FormFieldConfig {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  readonly?: boolean;
  validation?: ValidationRule;
  options?: SelectOption[]; // For radio buttons and select dropdowns
  rows?: number; // For textarea
  cols?: number; // For textarea
  helpText?: string;
  errorMessages?: { [key: string]: string };
}

export interface FormFieldError {
  fieldId: string;
  errors: string[];
}

export interface FormState {
  fields: FormFieldConfig[];
  values: { [key: string]: any };
  errors: FormFieldError[];
  touched: { [key: string]: boolean };
  dirty: { [key: string]: boolean };
  valid: boolean;
  submitting: boolean;
}
