import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[focusFirstField]',
})
export class FocusFirstFieldDirective implements AfterViewInit {
  #el = inject(ElementRef);

  ngAfterViewInit(): void {
    const firstMatFormField = this.#el.nativeElement.querySelector('mat-form-field');

    if (firstMatFormField) {
      const focusableElement = firstMatFormField.querySelector(
        'input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElement) {
        focusableElement.focus();
      } else {
        console.warn('No focusable control found inside the first mat-form-field.');
      }
    }
  }
}
