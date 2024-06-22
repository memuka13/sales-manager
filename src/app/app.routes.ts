import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'log-in',
  },
  {
    path: 'log-in',
    loadComponent: () =>
      import('./pages/log-in/log-in.component').then((m) => m.LogInComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'sales-managers',
    loadComponent: () =>
      import('./pages/sales-managers/sales-managers.component').then(
        (m) => m.SalesManagersComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'log-in',
  },
];
