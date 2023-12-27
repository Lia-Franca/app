import { NgIf } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { ControlContainer, FormGroupDirective, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-input-validation-message',
  standalone: true,
  templateUrl: './input-validation-message.component.html',
  styleUrls: ['./input-validation-message.component.scss']
})
export class InputValidationMessageComponent {
  @Input() public mode: 'warning' | 'error' = 'warning';

  @Input({required: false})
  public controlName: string = '';
  private rootFormGroup = inject(FormGroupDirective)
  private _controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this._controlContainer.control as FormGroup;
  }

  public get control(): FormControl {
    return this.rootFormGroup.form.controls[this.controlName] as FormControl;
  }
}