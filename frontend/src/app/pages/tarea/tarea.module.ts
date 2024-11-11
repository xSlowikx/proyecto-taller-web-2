import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TareaRoutes } from './tarea.routing';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(TareaRoutes),
    ],
  })
  export class TareaModule {}