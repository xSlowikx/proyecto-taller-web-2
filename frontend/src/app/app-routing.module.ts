import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaComponent } from './pages/tarea/tarea.component';
import { AddEditTareaComponent } from './pages/tarea/components/add-edit-tarea/add-edit-tarea.component';

const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareaComponent },
  { path: 'tareas/edit/:id', component:AddEditTareaComponent},
  { path: 'tareas/add', component:AddEditTareaComponent},
  { path: '**', redirectTo: 'tareas' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
})
export class AppRoutingModule { }