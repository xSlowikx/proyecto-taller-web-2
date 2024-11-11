import { Component } from '@angular/core';
import { TareaDTO_In } from '../../core/models/tarea/tarea.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent {
  
  tareas: TareaDTO_In[] = [
    {
      id_task: 1,
      title: 'Aprender Angular',
      description: 'Dedicarle unas 4 horas al día para aprender Angular',
      created_at: '2024-11-09T14:51:28.740Z',
      modified_at: null,
      completed_at: null,
      priority_id: 3,
      state_id: null
    },
    {
      id_task: 2,
      title: 'Practicar TypeScript',
      description: 'Repasar los conceptos básicos de TypeScript y sus tipos',
      created_at: '2024-11-08T10:30:00.000Z',
      modified_at: '2024-11-08T12:00:00.000Z',
      completed_at: null,
      priority_id: 2,
      state_id: null
    },
    {
      id_task: 3,
      title: 'Desarrollar un componente en Angular',
      description: 'Crear un componente simple de lista de tareas',
      created_at: '2024-11-07T09:00:00.000Z',
      modified_at: null,
      completed_at: null,
      priority_id: 1,
      state_id: 1
    }
  ];


  constructor(
    public dialog: MatDialog,
  ){}

  ngOnInit(){
    this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      data: {
        titulo: 'Atención',
        mensaje: 'holi',
      },
    });
  }

}
