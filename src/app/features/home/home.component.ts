import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { SelectOption } from '@models/form-field.model';

@Component({
  selector: 'app-home',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
          `${this.getFieldLabel(fieldName)} must be at least ${control.errors['minlength'].requiredLength} characters`,
        );
      }
      if (control.errors?.['maxlength']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must not exceed ${control.errors['maxlength'].requiredLength} characters`,
        );
      }
      if (control.errors?.['min']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must be at least ${control.errors['min'].min}`,
        );
      }
      if (control.errors?.['max']) {
        errors.push(
          `${this.getFieldLabel(fieldName)} must not exceed ${control.errors['max'].max}`,
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
