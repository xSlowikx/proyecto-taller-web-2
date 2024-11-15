import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TaskDTO_In } from '../../core/models/task/task.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { TareaService } from '../../core/services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  standalone: false,
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent implements OnInit {
  /*tareas: TareaDTO_In[] = [
    {
      id_task: 1,
      title: 'Aprender Angular',
      description: 'Dedicarle unas 4 horas al día para aprender Angular',
      created_at: '2024-11-09T14:51:28.740Z',
      modified_at: null,
      completed_at: null,
      priority_id: 3,
      state_id: null,
      rowClass: ''
    },
    {
      id_task: 2,
      title: 'Practicar TypeScript',
      description: 'Repasar los conceptos básicos de TypeScript y sus tipos',
      created_at: '2024-11-08T10:30:00.000Z',
      modified_at: '2024-11-08T12:00:00.000Z',
      completed_at: null,
      priority_id: 2,
      state_id: null,
      rowClass: ''
    },
    {
      id_task: 3,
      title: 'Desarrollar un componente en Angular',
      description: 'Crear un componente simple de lista de tareas',
      created_at: '2024-11-07T09:00:00.000Z',
      modified_at: null,
      completed_at: null,
      priority_id: 1,
      state_id: 1,
      rowClass: ''
    }];
  */

  tasks: TaskDTO_In[] = [];
  dataSource = new MatTableDataSource<TaskDTO_In>();
  displayedColumns: string[] = [
    'estado',
    'titulo',
    'descripcion',
    'prioridad',
    'creado',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog, 
    private router: Router,
    private _tasksService: TareaService
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    console.log('hola' + this.tasks)
    this.dataSource.data = this.tasks.map((task) => ({
      ...task,
      rowClass: task.state_id === 1 ? 'tachado' : '',
    }));
  }

  ngAfterViewInit() {
    // Set the paginator after the view is initialized
    this.dataSource.paginator = this.paginator;
  }

  async obtenerDatos(){
    this.tasks = await this._tasksService.getAllTareas();
  }

  createTask() {
    // Implementation for creating a task
  }
  editar(id: number) {
    this.router.navigate(['/tareas/edit', id]);
  }
  toggleRow(checked: boolean, element: TaskDTO_In, checkbox: MatCheckbox) {
    // Cambiar el estado del elemento
    element.state_id = checked ? 1 : 0;

    // Cambiar la clase de la fila según el estado
    //element.rowClass = element.state_id === 1 ? 'tachado' : '';

    // Obtener la fila más cercana y alternar la clase 'tachado'
    const row = checkbox._elementRef.nativeElement.closest('tr'); // Usamos nativeElement para acceder al tr
    if (row) {
      row.classList.toggle('tachado', checked); // Tacha o destacha la fila según el estado del checkbox
    }
  }
}
