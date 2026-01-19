import { DestroyRef, Directive, inject } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appBaseDirective]'
})
export class BaseDirective {
  protected readonly destroy$ = new Subject<void>();
  protected readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }
}
