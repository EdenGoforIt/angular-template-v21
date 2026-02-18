import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[focusFirstField]',
})
export class FocusFirstFieldDirective {
  #el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const firstMatFormField = this.#el.nativeElement.querySelector('mat-form-field');

      if (firstMatFormField) {
        const focusableElement = firstMatFormField.querySelector(
          'input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElement) {
          focusableElement.focus();
        }
      }
    });
  }
}
