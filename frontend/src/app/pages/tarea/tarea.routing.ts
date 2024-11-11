import { Routes } from '@angular/router';

export const TareaRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tarea.component').then((m) => m.TareaComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-tarea/add-edit-tarea.component').then(
        (m) => m.AddEditTareaComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/add-edit-tarea/add-edit-tarea.component').then(
        (m) => m.AddEditTareaComponent
      ),
  },
];
