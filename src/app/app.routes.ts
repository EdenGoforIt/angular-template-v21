import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dynamic-forms',
    loadComponent: () =>
      import('./features/dynamic-forms-example/dynamic-forms-example.component').then(
        (m) => m.DynamicFormsExampleComponent,
      ),
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./core/components/access-denied/access-denied.component').then(
        (m) => m.AccessDeniedComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
