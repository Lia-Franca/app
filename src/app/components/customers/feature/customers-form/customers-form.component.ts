import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@app-shared/components/button/button.component';
import { InputComponent } from '../../../ui/input/input.component'
import { ICustomer, ICustomersForm } from '../../data-access/entities/customers.interface';
import { CustomersFacade } from '../../data-access/customers.facade';
import { InputValidationMessageComponent } from '../../../ui/input-validation-message/input-validation-message.component';
import { ageValidator, cpfValidator, surnameValidator } from '@app-shared/utils/validator.util';
import { DateTime } from "luxon";
import { AlertComponent } from '../../../ui/alert/alert.component';
import { ActivatedRoute } from '@angular/router';
import { formatToISO } from '@app-shared/utils/formatToISODate.util';
import { formatFromISO } from '@app-shared/utils/formatFromISODate.util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customers-form',
  standalone: true,
  imports: [
    InputComponent,
    InputValidationMessageComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.scss'
})
export class CustomersFormComponent {
  public customersFacade = inject(CustomersFacade);
  private route = inject(ActivatedRoute);

  public form = new FormBuilder().group<ICustomersForm>({
    id: new FormControl<number | null>(null),
    NomeCliente: new FormControl<string>('', [Validators.required, surnameValidator]),
    Cpf: new FormControl<string>('', [Validators.required, cpfValidator]),
    DataNascimento: new FormControl<string>('', [Validators.required, ageValidator]),
    RendaMensal: new FormControl<string>('', [Validators.required]),
    Email: new FormControl<string>('', [Validators.required, Validators.email]),
    DataCadastro: new FormControl<string>(''),
  });
  private destroyRef = inject(DestroyRef);
  
  constructor() {
    this.route.params.subscribe((params) => {
      if (!params['id']) return;

      this.customersFacade.getCustomer(params['id'])
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (customer) => {
          this.form.patchValue(customer[0])
          this.form.controls.DataCadastro.setValue(String(formatFromISO(customer[0].DataCadastro)));
          this.form.controls.DataNascimento.setValue(String(formatFromISO(customer[0].DataNascimento)));
        },
        error: (err) => {
          console.error(err)
        }
      })
    });
  }

  public submit(form: FormGroup) {
    form.markAsDirty();
    form.disable();
    form.markAllAsTouched();
    if (form.invalid) {
      form.enable();
      return;
    }
    

    let birthDate = this.form.controls.DataNascimento.value;

    if (birthDate && birthDate.length <= 10  && birthDate !== 'Invalid DateTime') {
      birthDate = formatToISO(String(this.form.controls.DataNascimento.value));
    }

    const objToSave: ICustomer = {
      ...this.form.value,
      id: Number(this.form.controls.id.value) ?? null,
      DataNascimento: birthDate ?? this.form.controls.DataNascimento.value ?? '',
      DataCadastro: DateTime.now().toString(),
      NomeCliente: this.form.controls.NomeCliente.value as string,
      Cpf: this.form.controls.Cpf.value as string,
      RendaMensal: this.form.controls.RendaMensal.value as string,
      Email: this.form.controls.Email.value as string,
    }

    this.customersFacade.saveCustomer(objToSave)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.customersFacade.navigate(['/customers']);
      },
      error: (err) => {
        console.error(err)
      },
    })
  }
}
