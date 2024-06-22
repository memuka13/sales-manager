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
    path: '**',
    redirectTo: 'log-in',
  },
];
