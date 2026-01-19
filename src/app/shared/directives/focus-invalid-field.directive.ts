import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidField]',
  standalone: true
})
export class FocusInvalidFieldDirective {
  #el = inject(ElementRef);

  @HostListener('submit')
  onFormSubmit() {
    const invalidElements = this.#el.nativeElement.querySelectorAll('mat-form-field .ng-invalid');

    if (invalidElements.length > 0) {
      // Set focus on first invalid field of the form
      invalidElements[0].focus();
    }
  }
}
