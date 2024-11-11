import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TareaDTO_In } from '../../core/models/tarea/tarea.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {
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
    }];
  
  dataSource = new MatTableDataSource<TareaDTO_In>();
  displayedColumns: string[] = ['titulo', 'descripcion', 'prioridad', 'creado', 'estado', 'acciones'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    // Initialize the data source
    this.dataSource.data = this.tareas;
  }

  ngAfterViewInit() {
    // Set the paginator after the view is initialized
    this.dataSource.paginator = this.paginator;
  }

  createTask() {
    // Implementation for creating a task
  }

  editar(id: number, edit: boolean) {
    this.router.navigate(['/tarea/edit'], { state: { id: id, editMode: true } });
  }
}
