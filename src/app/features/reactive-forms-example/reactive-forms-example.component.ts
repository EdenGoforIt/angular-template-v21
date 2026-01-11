import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { NumberInputComponent } from '@shared/components/number-input/number-input.component';
import { TextareaInputComponent } from '@shared/components/textarea-input/textarea-input.component';
import { CheckboxInputComponent } from '@shared/components/checkbox-input/checkbox-input.component';
import { RadioInputComponent } from '@shared/components/radio-input/radio-input.component';
import { SelectOption } from '@models/form-field.model';

@Component({
  selector: 'app-reactive-forms-example',
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
    <div class="page-container">
      <h1>Reactive Forms Example</h1>
      <p class="description">
        This page demonstrates reactive form components with signal-based state
        management.
      </p>

      <div class="form-container">
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <h2>User Registration Form</h2>

          <app-text-input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            [required]="true"
            [errors]="getFieldErrors('firstName')"
            formControlName="firstName"
          />

          <app-text-input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            [required]="true"
            [errors]="getFieldErrors('lastName')"
            formControlName="lastName"
          />

          <app-text-input
            id="email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            [required]="true"
            helpText="We'll never share your email with anyone else."
            [errors]="getFieldErrors('email')"
            formControlName="email"
          />

          <app-number-input
            id="age"
            label="Age"
            placeholder="Enter your age"
            [required]="true"
            [min]="18"
            [max]="120"
            helpText="You must be at least 18 years old."
            [errors]="getFieldErrors('age')"
            formControlName="age"
          />

          <app-radio-input
            id="gender"
            name="gender"
            label="Gender"
            [required]="true"
            [options]="genderOptions()"
            [errors]="getFieldErrors('gender')"
            formControlName="gender"
          />

          <app-textarea-input
            id="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
            [rows]="5"
            helpText="Write a short bio (max 500 characters)"
            [errors]="getFieldErrors('bio')"
            formControlName="bio"
          />

          <app-checkbox-input
            id="agreeToTerms"
            label="I agree to the terms and conditions"
            [required]="true"
            [errors]="getFieldErrors('agreeToTerms')"
            formControlName="agreeToTerms"
          />

          <app-checkbox-input
            id="newsletter"
            label="Subscribe to newsletter"
            helpText="Receive updates about new features and announcements"
            formControlName="newsletter"
          />

          <div class="form-actions">
            <button
              type="submit"
              [disabled]="userForm.invalid || submitting()"
              class="btn btn-primary"
            >
              {{ submitting() ? 'Submitting...' : 'Submit' }}
            </button>
            <button type="button" (click)="onReset()" class="btn btn-secondary">
              Reset
            </button>
          </div>
        </form>

        <div *ngIf="submittedData()" class="result-panel">
          <h3>Submitted Data:</h3>
          <pre>{{ submittedData() | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        max-width: 1200px;
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

      .form-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }

      @media (max-width: 768px) {
        .form-container {
          grid-template-columns: 1fr;
        }
      }

      form {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1.5rem;
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

      .result-panel {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      pre {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 0.375rem;
        overflow-x: auto;
        font-size: 0.875rem;
        color: #1f2937;
      }
    `,
  ],
})
export class ReactiveFormsExampleComponent {
  private fb = new FormBuilder();

  userForm: FormGroup;
  submitting = signal<boolean>(false);
  submittedData = signal<any>(null);

  genderOptions = signal<SelectOption[]>([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'not_specified' },
  ]);

  constructor() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: ['', Validators.required],
      bio: ['', Validators.maxLength(500)],
      agreeToTerms: [false, Validators.requiredTrue],
      newsletter: [false],
    });
  }

  getFieldErrors(fieldName: string): string[] {
    const control = this.userForm.get(fieldName);
    const errors: string[] = [];

    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        errors.push(`${this.getFieldLabel(fieldName)} is required`);
      }
      if (control.errors?.['email']) {
        errors.push('Please enter a valid email address');
      }
      if (control.errors?.['minlength']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must be at least ${control.errors['minlength'].requiredLength} characters`
        );
      }
      if (control.errors?.['maxlength']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must not exceed ${control.errors['maxlength'].requiredLength} characters`
        );
      }
      if (control.errors?.['min']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must be at least ${control.errors['min'].min}`
        );
      }
      if (control.errors?.['max']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must not exceed ${control.errors['max'].max}`
        );
      }
      if (control.errors?.['requiredTrue']) {
        errors.push('You must agree to the terms and conditions');
      }
    }

    return errors;
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      age: 'Age',
      gender: 'Gender',
      bio: 'Bio',
      agreeToTerms: 'Terms and Conditions',
      newsletter: 'Newsletter',
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.submitting.set(true);

      // Simulate API call
      setTimeout(() => {
        this.submittedData.set(this.userForm.value);
        this.submitting.set(false);
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  onReset(): void {
    this.userForm.reset();
    this.submittedData.set(null);
  }
}
