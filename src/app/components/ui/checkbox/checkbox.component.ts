import { NgStyle, NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgStyle, NgIf, NgClass],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() for: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() value: string = '';
  @Input() autocomplete: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() set checked(value: boolean) { this.isChecked = value; };
  @Input() color: string | undefined = '#4CE364';
  @Input() radioBehavior: boolean = false;
  @Output() check = new EventEmitter<boolean>();

  public onChange: any = () => {};
  public onTouched: any = () => {};
  public isChecked: boolean = false;

  public writeValue(value: any): void {
    this.isChecked = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public toggle(): void {
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked);
    this.check.emit(this.isChecked);
  }
}
