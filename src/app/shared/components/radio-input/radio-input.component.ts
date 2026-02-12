import {
  Component,
  computed,
  input,
  output,
  signal,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { SelectOption } from '@models/form-field.model';

@Component({
  selector: 'app-radio-input',
  imports: [ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-group">
      @if (label()) {
        <div class="form-label">
          {{ label() }}
          @if (required()) {
            <span class="required">*</span>
          }
        </div>
      }
      <div class="radio-group">
        @for (option of options(); track option.value) {
        <div class="radio-wrapper">
          <input
            [id]="id() + '-' + option.value"
            type="radio"
            [name]="name()"
            [value]="option.value"
            [disabled]="disabled()"
            [checked]="value() === option.value"
            (change)="onRadioChange(option.value)"
            (blur)="onTouched()"
            class="radio-input"
          />
          <label [for]="id() + '-' + option.value" class="radio-label">
            {{ option.label }}
          </label>
        </div>
        }
      </div>
      @if (helpText()) {
        <small class="help-text">{{ helpText() }}</small>
      }
      @if (showError()) {
        <div class="error-message">
          @for (error of errors(); track error) {
            <small>{{ error }}</small>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-label {
        display: block;
        margin-bottom: 0.75rem;
        font-weight: 500;
        color: #374151;
      }

      .required {
        color: #ef4444;
      }

      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .radio-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .radio-input {
        width: 1.125rem;
        height: 1.125rem;
        border: 1px solid #d1d5db;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }

      .radio-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .radio-input:checked {
        accent-color: #3b82f6;
      }

      .radio-input:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
      }

      .radio-label {
        margin: 0;
        font-weight: 400;
        color: #374151;
        cursor: pointer;
        user-select: none;
      }

      .help-text {
        display: block;
        margin-top: 0.5rem;
        color: #6b7280;
        font-size: 0.875rem;
      }

      .error-message {
        margin-top: 0.5rem;
      }

      .error-message small {
        display: block;
        color: #ef4444;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class RadioInputComponent implements ControlValueAccessor {
  id = input.required<string>();
  name = input.required<string>();
  label = input<string>('');
  helpText = input<string>('');
  required = input<boolean>(false);
  options = input<SelectOption[]>([]);
  errors = input<string[]>([]);

  value = signal<string | number>(null as unknown as string | number);
  disabled = signal<boolean>(false);
  touched = signal<boolean>(false);
  showError = computed(() => this.touched() && this.errors().length > 0);

  valueChange = output<string | number>();

  private onChange: (value: string | number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | number): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = () => {
      this.touched.set(true);
      fn();
    };
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onRadioChange(value: string | number): void {
    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }
}
