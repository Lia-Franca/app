import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '', loadChildren: () => import('./presentation/customers-routes').then((r) => r.CUSTOMERS_ROUTE)
      },

];