import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { FormFieldConfig } from '@models/form-field.model';

@Component({
  selector: 'app-dynamic-forms-example',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `
    <div class="page-container">
      <h1>Dynamic Forms Example</h1>
      <p class="description">
        This page demonstrates dynamic form generation from configuration with
        signal-based state management.
      </p>

      <div class="form-container">
        <div class="form-wrapper">
          <h2>Contact Form</h2>
          <app-dynamic-form
            [fields]="contactFormFields()"
            submitButtonText="Send Message"
            resetButtonText="Clear Form"
            (formSubmit)="onContactFormSubmit($event)"
            (formReset)="onContactFormReset()"
          />
        </div>

        <div *ngIf="contactSubmittedData()" class="result-panel">
          <h3>Contact Form Data:</h3>
          <pre>{{ contactSubmittedData() | json }}</pre>
        </div>
      </div>

      <div class="form-container">
        <div class="form-wrapper">
          <h2>Product Order Form</h2>
          <app-dynamic-form
            [fields]="orderFormFields()"
            submitButtonText="Place Order"
            resetButtonText="Clear"
            (formSubmit)="onOrderFormSubmit($event)"
            (formReset)="onOrderFormReset()"
          />
        </div>

        <div *ngIf="orderSubmittedData()" class="result-panel">
          <h3>Order Form Data:</h3>
          <pre>{{ orderSubmittedData() | json }}</pre>
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
        margin-bottom: 3rem;
      }

      @media (max-width: 768px) {
        .form-container {
          grid-template-columns: 1fr;
        }
      }

      .form-wrapper {
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
export class DynamicFormsExampleComponent {
  contactSubmittedData = signal<any>(null);
  orderSubmittedData = signal<any>(null);

  contactFormFields = signal<FormFieldConfig[]>([
    {
      id: 'fullName',
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      validation: {
        required: true,
        minLength: 3,
      },
      errorMessages: {
        required: 'Please enter your full name',
        minLength: 'Name must be at least 3 characters',
      },
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@example.com',
      validation: {
        required: true,
        email: true,
      },
      helpText: 'We will respond to this email address',
      errorMessages: {
        required: 'Email is required',
        email: 'Please enter a valid email address',
      },
    },
    {
      id: 'subject',
      name: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'How can we help?',
      validation: {
        required: true,
        minLength: 5,
      },
    },
    {
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Type your message here...',
      rows: 6,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 1000,
      },
      helpText: 'Max 1000 characters',
    },
    {
      id: 'contactPreference',
      name: 'contactPreference',
      label: 'Preferred Contact Method',
      type: 'radio',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'No preference', value: 'none' },
      ],
      validation: {
        required: true,
      },
    },
  ]);

  orderFormFields = signal<FormFieldConfig[]>([
    {
      id: 'productName',
      name: 'productName',
      label: 'Product Name',
      type: 'text',
      placeholder: 'Enter product name',
      validation: {
        required: true,
      },
    },
    {
      id: 'quantity',
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      placeholder: '1',
      value: 1,
      validation: {
        required: true,
        min: 1,
        max: 100,
      },
      helpText: 'Minimum 1, maximum 100',
    },
    {
      id: 'price',
      name: 'price',
      label: 'Price per Unit ($)',
      type: 'number',
      placeholder: '0.00',
      validation: {
        required: true,
        min: 0.01,
      },
    },
    {
      id: 'shippingAddress',
      name: 'shippingAddress',
      label: 'Shipping Address',
      type: 'textarea',
      placeholder: 'Enter complete shipping address...',
      rows: 3,
      validation: {
        required: true,
        minLength: 10,
      },
    },
    {
      id: 'urgentDelivery',
      name: 'urgentDelivery',
      label: 'Urgent delivery (additional charges apply)',
      type: 'checkbox',
      value: false,
    },
    {
      id: 'paymentMethod',
      name: 'paymentMethod',
      label: 'Payment Method',
      type: 'radio',
      options: [
        { label: 'Credit Card', value: 'credit_card' },
        { label: 'Debit Card', value: 'debit_card' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
      ],
      validation: {
        required: true,
      },
    },
    {
      id: 'specialInstructions',
      name: 'specialInstructions',
      label: 'Special Instructions',
      type: 'textarea',
      placeholder: 'Any special delivery instructions...',
      rows: 3,
      helpText: 'Optional field for any special requirements',
    },
  ]);

  onContactFormSubmit(data: any): void {
    console.log('Contact form submitted:', data);
    this.contactSubmittedData.set(data);
  }

  onContactFormReset(): void {
    console.log('Contact form reset');
    this.contactSubmittedData.set(null);
  }

  onOrderFormSubmit(data: any): void {
    console.log('Order form submitted:', data);
    this.orderSubmittedData.set(data);
  }

  onOrderFormReset(): void {
    console.log('Order form reset');
    this.orderSubmittedData.set(null);
  }
}
