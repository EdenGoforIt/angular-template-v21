import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidField]',
  host: {
    '(submit)': 'onFormSubmit()',
  },
})
export class FocusInvalidFieldDirective {
  #el = inject(ElementRef);

  onFormSubmit(): void {
    const invalidElements = this.#el.nativeElement.querySelectorAll('mat-form-field .ng-invalid');

    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }
}
