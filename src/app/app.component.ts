import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './presentation/navbar/navbar.component';
import { CustomersFormComponent } from './components/customers/feature/customers-form/customers-form.component';
import { CustomersGridComponent } from './components/customers/feature/customers-grid/customers-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, CustomersGridComponent, CustomersFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}
