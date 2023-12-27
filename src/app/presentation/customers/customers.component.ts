import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersFormComponent } from '../../components/customers/feature/customers-form/customers-form.component';
import { CustomersGridComponent } from '../../components/customers/feature/customers-grid/customers-grid.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, CustomersGridComponent, CustomersFormComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
