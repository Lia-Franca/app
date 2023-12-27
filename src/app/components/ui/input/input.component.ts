import { NgIf, NgClass, NgStyle } from "@angular/common";
import { Component, DestroyRef, Input, forwardRef, inject, signal } from "@angular/core";
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormGroupDirective, ControlContainer } from "@angular/forms";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    provideNgxMask(),
  ],
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    NgxMaskDirective,
    CurrencyMaskModule
  ]
}) export class InputComponent {
  @Input() id: string = '';
  @Input() mask: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() for: string = '';
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() currencyMask: boolean = false;
  @Input() errorState: boolean = false;
  public destroyRef = inject(DestroyRef);
  public showPassword = signal(false);
  public originalType = signal('');
  private _value: string = '';
  public onChange: any = () => {};
  public onTouched: any = () => {};
  private rootFormGroup = inject(FormGroupDirective)
  private _controlContainer = inject(ControlContainer);

  ngOnInit() {
    this.originalType.set(structuredClone(this.type));
  }

  set value(value: string) {
    this._value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  get value(): string {
    return this._value;
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(value: any): void {
    this.onChange = value;
  }

  public registerOnTouched(value: any): void {
    this.onTouched = value;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get form(): FormGroup {
    return this._controlContainer.control as FormGroup;
  }

  public get control(): FormControl {
    return this.rootFormGroup.form.controls[this.name] as FormControl;
  }

}