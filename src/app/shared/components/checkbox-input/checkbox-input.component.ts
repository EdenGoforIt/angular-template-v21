import {
  Component,
  input,
  output,
  signal,
  effect,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-checkbox-input',
  imports: [ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-group">
      <div class="checkbox-wrapper">
        <input
          [id]="id()"
          type="checkbox"
          [disabled]="disabled()"
          [checked]="value()"
          (change)="onCheckboxChange($event)"
          (blur)="onTouched()"
          class="checkbox-input"
        />
        <label [for]="id()" class="checkbox-label">
          {{ label() }}
          @if (required()) {
            <span class="required">*</span>
          }
        </label>
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

      .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .checkbox-input {
        width: 1.125rem;
        height: 1.125rem;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
      }

      .checkbox-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .checkbox-input:checked {
        background-color: #3b82f6;
        border-color: #3b82f6;
      }

      .checkbox-input:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
      }

      .checkbox-label {
        margin: 0;
        font-weight: 500;
        color: #374151;
        cursor: pointer;
        user-select: none;
      }

      .required {
        color: #ef4444;
      }

      .help-text {
        display: block;
        margin-top: 0.25rem;
        margin-left: 1.625rem;
        color: #6b7280;
        font-size: 0.875rem;
      }

      .error-message {
        margin-top: 0.25rem;
        margin-left: 1.625rem;
      }

      .error-message small {
        display: block;
        color: #ef4444;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class CheckboxInputComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input<string>('');
  helpText = input<string>('');
  required = input<boolean>(false);
  errors = input<string[]>([]);

  value = signal<boolean>(false);
  disabled = signal<boolean>(false);
  touched = signal<boolean>(false);
  showError = signal<boolean>(false);

  valueChange = output<boolean>();

  private onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.showError.set(this.touched() && this.errors().length > 0);
    });
  }

  writeValue(value: boolean): void {
    this.value.set(value || false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
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

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const newValue = checkbox.checked;
    this.value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }
}
