import { Route } from '@angular/router';
import { AnonymGuard } from './guard/anonym.guard';
import { AuthGuard } from './guard/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/log-in/log-in.component').then((m) => m.LogInComponent),
    canActivate: [AnonymGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [AnonymGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'sales-managers',
        loadComponent: () =>
          import('./pages/sales-managers/sales-managers.component').then(
            (m) => m.SalesManagersComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
