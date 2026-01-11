import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'reactive-forms',
    loadComponent: () =>
      import('./features/reactive-forms-example/reactive-forms-example.component').then(
        (m) => m.ReactiveFormsExampleComponent
      ),
  },
  {
    path: 'dynamic-forms',
    loadComponent: () =>
      import('./features/dynamic-forms-example/dynamic-forms-example.component').then(
        (m) => m.DynamicFormsExampleComponent
      ),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./features/table-example/table-example.component').then(
        (m) => m.TableExampleComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
