import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FieldType } from '@app/shared/models';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDynamicBaseFormDirective]',
  standalone: true
})
export class DynamicBaseFormDirective implements OnInit, OnDestroy {
  @Output() clear = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Input() declare field: FieldType;
  @Input() declare disabled: boolean;
  @Input() declare required: boolean;
  @Input() hidden = false;

  // Value can be dynamic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() value: any;

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.setDefaultValue();
  }

  setDefaultValue() {
    if (this.val == null && this.field.defaultValue != null) {
      this.val = this.field.defaultValue;
    }
  }

  get val() {
    return this.value;
  }

  set val(val) {
    this.value = val;
    this.valueChange.emit(this.value);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
