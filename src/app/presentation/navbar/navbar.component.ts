import { Component } from '@angular/core';
import { LogoComponent } from '@app-shared/components/logo/logo.component';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuComponent, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

}
