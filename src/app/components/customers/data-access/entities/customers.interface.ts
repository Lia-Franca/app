import { FormControl } from "@angular/forms"

export interface ICustomer {
    id?: number,
    NomeCliente: string,
    Cpf: string,
    DataNascimento: string,
    RendaMensal: string,
    Email: string,
    DataCadastro: string,
}

export interface ICustomersForm {
    id: FormControl<number | null>,
    NomeCliente: FormControl<string | null>,
    Cpf: FormControl<string | null>,
    DataNascimento: FormControl<string | null>,
    RendaMensal: FormControl<string | null>,
    Email: FormControl<string | null>,
    DataCadastro: FormControl<string | null>
}

export interface EmpFilter {
    name: string;
    options: string[];
    defaultValue: string;
  }
  
export interface filterOption{
  name: string;
  value: string;
  isdefault: boolean;
}

export interface IAlert {
  text: string;
  type: string;
}