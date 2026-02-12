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
@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-group">
      @if (label()) {
        <label [for]="id()" class="form-label">
          {{ label() }}
          @if (required()) {
            <span class="required">*</span>
          }
        </label>
      }
      <input
        [id]="id()"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [value]="value()"
        (input)="onInputChange($event)"
        (blur)="onTouched()"
        class="form-control"
        [class.error]="showError()"
      />
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
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
      }

      .required {
        color: #ef4444;
      }

      .form-control {
        width: 100%;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #1f2937;
        background-color: #fff;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      .form-control:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .form-control:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
      }

      .form-control.error {
        border-color: #ef4444;
      }

      .help-text {
        display: block;
        margin-top: 0.25rem;
        color: #6b7280;
        font-size: 0.875rem;
      }

      .error-message {
        margin-top: 0.25rem;
      }

      .error-message small {
        display: block;
        color: #ef4444;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input<string>('');
  type = input<'text' | 'email' | 'password'>('text');
  placeholder = input<string>('');
  helpText = input<string>('');
  required = input<boolean>(false);
  readonly = input<boolean>(false);
  errors = input<string[]>([]);

  value = signal<string>('');
  disabled = signal<boolean>(false);
  touched = signal<boolean>(false);
  showError = computed(() => this.touched() && this.errors().length > 0);

  valueChange = output<string>();

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
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

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }
}
