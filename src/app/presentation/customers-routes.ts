import { Route } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from '../components/customers/feature/customers-grid/customers-grid.component';
import { CustomersFormComponent } from '../components/customers/feature/customers-form/customers-form.component';

export const CUSTOMERS_ROUTE: Route[] = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: '',
    component: CustomersComponent,
    title: 'Clientes',
    children: [
      { path: 'customers', component: CustomersGridComponent, title: 'Todos Clientes' },
      { path: 'customer', component: CustomersFormComponent, title: 'Cadastrar Cliente' },
      { path: 'customer/:id', component: CustomersFormComponent, title: 'Editar Cliente' },
      { path: '**', pathMatch: 'full', redirectTo: 'customers' }
    ]
  }
]