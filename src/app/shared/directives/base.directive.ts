import { DestroyRef, Directive, inject } from '@angular/core';

@Directive({
  selector: '[appBaseDirective]',
})
export class BaseDirective {
  protected readonly destroyRef = inject(DestroyRef);
}
