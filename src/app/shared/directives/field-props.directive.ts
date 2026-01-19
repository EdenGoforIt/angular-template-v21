import { AfterViewChecked, Directive, ElementRef, inject, Input } from '@angular/core';
import { FieldType } from '@app/shared/models';

@Directive({
  selector: '[appFieldProps]',
  standalone: true
})
export class FieldPropsDirective implements AfterViewChecked {
  @Input('appFieldProps') props!: FieldType;
  #el = inject(ElementRef);

  ngAfterViewChecked() {
    this.#el.nativeElement.id = this.props.fieldName;
    this.#el.nativeElement.placeholder = this.props.placeHolderText;
  }
}
