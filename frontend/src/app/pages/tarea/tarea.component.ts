import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TaskDTO_In } from '../../core/models/task/task.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { EliminarDialogComponent } from '../../components/eliminar-dialog/eliminar-dialog.component';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { TareaService } from '../../core/services/tarea.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  standalone: false,
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {
  @Output() refreshEvent = new EventEmitter<void>();
 
    tasks: TaskDTO_In[] = []
  dataSource = new MatTableDataSource<TaskDTO_In>();
  displayedColumns: string[] = ['estado', 'titulo', 'descripcion', 'prioridad', 'creado',  'acciones'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private router: Router,  private _tareaService: TareaService) {}

  async ngOnInit() {
    await this.obtenerDatos();
    console.log('hola' + this.tasks)
    this.dataSource.data = this.tasks.map((task) => ({
      ...task,
      rowClass: task.state_id === 1 ? 'tachado' : ''
    }));
  }

  ngAfterViewInit() {
    // Set the paginator after the view is initialized
    this.dataSource.paginator = this.paginator;
  }

  async obtenerDatos() {
    try {
      const response = await firstValueFrom(this._tareaService.getTasks());
      this.tasks = response.map(task => ({
        id_task: task.id_task,
        title: task.title,
        description: task.description,
        created_at: task.created_at,
        modified_at: task.modified_at,
        completed_at: task.completed_at,
        user_id: task.user_id,
        priority_id: task.priority_id,
        state_id: task.state_id,
      }));
      console.log('Tasks transformadas:', this.tasks);
    } catch (error) {
      console.error('Error al obtener tasks:', error);
    }
  }
  
  

  createTask() {
    // Implementation for creating a task
  }
  editar(id: number) {
    this.router.navigate(['/tareas/edit', id]);
  }
  toggleRow(checked: boolean, element: TaskDTO_In, checkbox: MatCheckbox) {
    // Cambiar el estado del elemento
    element.state_id = checked ? 2 : 0;
    
    // Cambiar la clase de la fila según el estado
    //element.rowClass = element.state_id === 1 ? 'tachado' : '';
    
    // Obtener la fila más cercana y alternar la clase 'tachado'
    const row = checkbox._elementRef.nativeElement.closest('tr'); // Usamos nativeElement para acceder al tr
    if (row) {
      row.classList.toggle('tachado', checked); // Tacha o destacha la fila según el estado del checkbox
    }
  }

  async openDialog(id: number) {
    const dialogRef = this.dialog.open(EliminarDialogComponent, {
      width: '600px',
      data: {
        titulo: 'Eliminar Tarea',
        mensaje:
          '¿Está seguro que desea eliminar esta tarea? Este cambio es irreversible.',
      },
    });
  
    const res = await dialogRef.afterClosed().toPromise();
  
    if (res) {
      try {
        await this._tareaService.eliminarTareaById(id);
        this.refreshEvent.emit();
      } catch (e) {
        this.dialog.open(ErrorDialogComponent, {
          width: '600px',
          data: {
            titulo: 'Atención',
            mensaje: e,
          },
        });
      }
    }
  }
  
}