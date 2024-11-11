import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaComponent } from './pages/tarea/tarea.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  /*{
    path: '',
    component: TareaComponent,
    children: [
      {
        path: '',
        redirectTo: 'tareas',
        pathMatch: 'full',
      },
    ]
    }*/

  { path: '', redirectTo: '/tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareaComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
