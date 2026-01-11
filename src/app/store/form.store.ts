import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import {
  FormState,
  FormFieldConfig,
  FormFieldError,
  ValidationRule,
} from '@models/form-field.model';

const initialState: FormState = {
  fields: [],
  values: {},
  errors: [],
  touched: {},
  dirty: {},
  valid: true,
  submitting: false,
};

export const FormStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isValid: computed(() => store.errors().length === 0 && store.valid()),
    isDirty: computed(() => Object.values(store.dirty()).some((d) => d)),
    isTouched: computed(() => Object.values(store.touched()).some((t) => t)),
    formData: computed(() => store.values()),
  })),
  withMethods((store) => ({
    // Initialize form with fields
    initializeForm(fields: FormFieldConfig[]) {
      const values: { [key: string]: any } = {};
      const touched: { [key: string]: boolean } = {};
      const dirty: { [key: string]: boolean } = {};

      fields.forEach((field) => {
        values[field.id] = field.value ?? null;
        touched[field.id] = false;
        dirty[field.id] = false;
      });

      return {
        fields,
        values,
        touched,
        dirty,
        errors: [],
        valid: true,
        submitting: false,
      };
    },

    // Update field value
    updateFieldValue(fieldId: string, value: any) {
      const currentValues = store.values();
      const currentDirty = store.dirty();

      return {
        values: { ...currentValues, [fieldId]: value },
        dirty: { ...currentDirty, [fieldId]: true },
      };
    },

    // Mark field as touched
    markFieldAsTouched(fieldId: string) {
      const currentTouched = store.touched();

      return {
        touched: { ...currentTouched, [fieldId]: true },
      };
    },

    // Validate field
    validateField(fieldId: string): FormFieldError | null {
      const field = store.fields().find((f) => f.id === fieldId);
      const value = store.values()[fieldId];

      if (!field || !field.validation) {
        return null;
      }

      const errors: string[] = [];
      const validation = field.validation;

      if (validation.required && (value === null || value === undefined || value === '')) {
        errors.push(
          field.errorMessages?.['required'] || `${field.label} is required`
        );
      }

      if (
        validation.minLength &&
        typeof value === 'string' &&
        value.length < validation.minLength
      ) {
        errors.push(
          field.errorMessages?.['minLength'] ||
            `${field.label} must be at least ${validation.minLength} characters`
        );
      }

      if (
        validation.maxLength &&
        typeof value === 'string' &&
        value.length > validation.maxLength
      ) {
        errors.push(
          field.errorMessages?.['maxLength'] ||
            `${field.label} must not exceed ${validation.maxLength} characters`
        );
      }

      if (validation.min && typeof value === 'number' && value < validation.min) {
        errors.push(
          field.errorMessages?.['min'] ||
            `${field.label} must be at least ${validation.min}`
        );
      }

      if (validation.max && typeof value === 'number' && value > validation.max) {
        errors.push(
          field.errorMessages?.['max'] ||
            `${field.label} must not exceed ${validation.max}`
        );
      }

      if (validation.pattern && typeof value === 'string') {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          errors.push(
            field.errorMessages?.['pattern'] || `${field.label} format is invalid`
          );
        }
      }

      if (validation.email && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push(
            field.errorMessages?.['email'] || `${field.label} must be a valid email`
          );
        }
      }

      if (validation.custom && !validation.custom(value)) {
        errors.push(
          field.errorMessages?.['custom'] || `${field.label} validation failed`
        );
      }

      return errors.length > 0 ? { fieldId, errors } : null;
    },

    // Validate all fields
    validateForm() {
      const errors: FormFieldError[] = [];

      store.fields().forEach((field) => {
        const fieldError = this.validateField(field.id);
        if (fieldError) {
          errors.push(fieldError);
        }
      });

      return {
        errors,
        valid: errors.length === 0,
      };
    },

    // Reset form
    resetForm() {
      const values: { [key: string]: any } = {};
      const touched: { [key: string]: boolean } = {};
      const dirty: { [key: string]: boolean } = {};

      store.fields().forEach((field) => {
        values[field.id] = field.value ?? null;
        touched[field.id] = false;
        dirty[field.id] = false;
      });

      return {
        values,
        touched,
        dirty,
        errors: [],
        valid: true,
        submitting: false,
      };
    },

    // Set submitting state
    setSubmitting(submitting: boolean) {
      return { submitting };
    },

    // Get field errors
    getFieldErrors(fieldId: string): string[] {
      const fieldError = store.errors().find((e) => e.fieldId === fieldId);
      return fieldError ? fieldError.errors : [];
    },
  }))
);
