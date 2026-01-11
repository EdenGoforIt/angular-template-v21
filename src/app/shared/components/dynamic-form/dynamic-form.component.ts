import { Component, input, output, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldConfig } from '@models/form-field.model';
import { TextInputComponent } from '../text-input/text-input.component';
import { NumberInputComponent } from '../number-input/number-input.component';
import { TextareaInputComponent } from '../textarea-input/textarea-input.component';
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    NumberInputComponent,
    TextareaInputComponent,
    CheckboxInputComponent,
    RadioInputComponent,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dynamic-form">
      <div *ngFor="let field of fields()" class="form-field">
        <!-- Text Input -->
        <app-text-input
          *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'password'"
          [id]="field.id"
          [label]="field.label"
          [type]="field.type"
          [placeholder]="field.placeholder || ''"
          [helpText]="field.helpText || ''"
          [required]="field.validation?.required || false"
          [readonly]="field.readonly || false"
          [errors]="getFieldErrors(field.id)"
          [formControlName]="field.id"
        />

        <!-- Number Input -->
        <app-number-input
          *ngIf="field.type === 'number'"
          [id]="field.id"
          [label]="field.label"
          [placeholder]="field.placeholder || ''"
          [helpText]="field.helpText || ''"
          [required]="field.validation?.required || false"
          [readonly]="field.readonly || false"
          [min]="field.validation?.min || null"
          [max]="field.validation?.max || null"
          [errors]="getFieldErrors(field.id)"
          [formControlName]="field.id"
        />

        <!-- Textarea -->
        <app-textarea-input
          *ngIf="field.type === 'textarea'"
          [id]="field.id"
          [label]="field.label"
          [placeholder]="field.placeholder || ''"
          [helpText]="field.helpText || ''"
          [required]="field.validation?.required || false"
          [readonly]="field.readonly || false"
          [rows]="field.rows || 4"
          [errors]="getFieldErrors(field.id)"
          [formControlName]="field.id"
        />

        <!-- Checkbox -->
        <app-checkbox-input
          *ngIf="field.type === 'checkbox'"
          [id]="field.id"
          [label]="field.label"
          [helpText]="field.helpText || ''"
          [required]="field.validation?.required || false"
          [errors]="getFieldErrors(field.id)"
          [formControlName]="field.id"
        />

        <!-- Radio -->
        <app-radio-input
          *ngIf="field.type === 'radio'"
          [id]="field.id"
          [name]="field.name"
          [label]="field.label"
          [helpText]="field.helpText || ''"
          [required]="field.validation?.required || false"
          [options]="field.options || []"
          [errors]="getFieldErrors(field.id)"
          [formControlName]="field.id"
        />
      </div>

      <div class="form-actions">
        <button
          type="submit"
          [disabled]="submitting() || form.invalid"
          class="btn btn-primary"
        >
          {{ submitButtonText() }}
        </button>
        <button
          type="button"
          (click)="onReset()"
          [disabled]="submitting()"
          class="btn btn-secondary"
        >
          {{ resetButtonText() }}
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .dynamic-form {
        max-width: 600px;
      }

      .form-field {
        margin-bottom: 1rem;
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }

      .btn {
        padding: 0.5rem 1.5rem;
        font-size: 1rem;
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

      .btn-primary {
        background-color: #3b82f6;
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        background-color: #2563eb;
      }

      .btn-secondary {
        background-color: #6b7280;
        color: white;
      }

      .btn-secondary:hover:not(:disabled) {
        background-color: #4b5563;
      }
    `,
  ],
})
export class DynamicFormComponent {
  private fb = inject(FormBuilder);

  fields = input.required<FormFieldConfig[]>();
  submitButtonText = input<string>('Submit');
  resetButtonText = input<string>('Reset');

  formSubmit = output<any>();
  formReset = output<void>();

  form!: FormGroup;
  submitting = signal<boolean>(false);
  fieldErrors = signal<Map<string, string[]>>(new Map());

  constructor() {
    effect(() => {
      this.buildForm();
    });

    effect(() => {
      this.form?.valueChanges.subscribe(() => {
        this.updateFieldErrors();
      });
    });
  }

  private buildForm(): void {
    const formControls: any = {};

    this.fields().forEach((field) => {
      const validators = [];

      if (field.validation?.required) {
        validators.push(Validators.required);
      }

      if (field.validation?.minLength) {
        validators.push(Validators.minLength(field.validation.minLength));
      }

      if (field.validation?.maxLength) {
        validators.push(Validators.maxLength(field.validation.maxLength));
      }

      if (field.validation?.min !== undefined) {
        validators.push(Validators.min(field.validation.min));
      }

      if (field.validation?.max !== undefined) {
        validators.push(Validators.max(field.validation.max));
      }

      if (field.validation?.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }

      if (field.validation?.email) {
        validators.push(Validators.email);
      }

      formControls[field.id] = [
        { value: field.value ?? null, disabled: field.disabled },
        validators,
      ];
    });

    this.form = this.fb.group(formControls);
  }

  private updateFieldErrors(): void {
    const errors = new Map<string, string[]>();

    this.fields().forEach((field) => {
      const control = this.form.get(field.id);
      if (control && control.invalid && (control.dirty || control.touched)) {
        const fieldErrors: string[] = [];

        if (control.errors?.['required']) {
          fieldErrors.push(
            field.errorMessages?.['required'] || `${field.label} is required`
          );
        }

        if (control.errors?.['minlength']) {
          fieldErrors.push(
            field.errorMessages?.['minLength'] ||
              `${field.label} must be at least ${control.errors['minlength'].requiredLength} characters`
          );
        }

        if (control.errors?.['maxlength']) {
          fieldErrors.push(
            field.errorMessages?.['maxLength'] ||
              `${field.label} must not exceed ${control.errors['maxlength'].requiredLength} characters`
          );
        }

        if (control.errors?.['min']) {
          fieldErrors.push(
            field.errorMessages?.['min'] ||
              `${field.label} must be at least ${control.errors['min'].min}`
          );
        }

        if (control.errors?.['max']) {
          fieldErrors.push(
            field.errorMessages?.['max'] ||
              `${field.label} must not exceed ${control.errors['max'].max}`
          );
        }

        if (control.errors?.['pattern']) {
          fieldErrors.push(
            field.errorMessages?.['pattern'] || `${field.label} format is invalid`
          );
        }

        if (control.errors?.['email']) {
          fieldErrors.push(
            field.errorMessages?.['email'] || `${field.label} must be a valid email`
          );
        }

        errors.set(field.id, fieldErrors);
      }
    });

    this.fieldErrors.set(errors);
  }

  getFieldErrors(fieldId: string): string[] {
    return this.fieldErrors().get(fieldId) || [];
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitting.set(true);
      this.formSubmit.emit(this.form.value);
      // Reset submitting state after submission
      setTimeout(() => this.submitting.set(false), 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      this.updateFieldErrors();
    }
  }

  onReset(): void {
    this.form.reset();
    this.fieldErrors.set(new Map());
    this.formReset.emit();
  }
}
