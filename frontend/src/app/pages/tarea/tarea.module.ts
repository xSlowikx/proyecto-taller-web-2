import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddEditTareaComponent } from './components/add-edit-tarea/add-edit-tarea.component';
import { TareaComponent } from './tarea.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      AddEditTareaComponent
    ],
  })
  export class TareaModule {}