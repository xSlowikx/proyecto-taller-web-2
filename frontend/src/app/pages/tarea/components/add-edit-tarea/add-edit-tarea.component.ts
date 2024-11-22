import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TareaService } from '../../../../core/services/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDTO_Out } from '../../../../core/models/task/task.model';
import { ErrorDialogComponent } from '../../../../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { PriorityDTO_In } from '../../../../core/models/priority/priority.model';
import { PriorityService } from '../../../../core/services/priority.service';

@Component({
  selector: 'app-add-edit-tarea',
  templateUrl: './add-edit-tarea.component.html',
  styleUrls: ['./add-edit-tarea.component.scss'],
  standalone: true,
  imports:[MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AddEditTareaComponent implements OnInit {
  id: number = 0;
  user: number = 0;
  editMode: boolean = false;
  title: string = 'Crear tarea';
  formTarea!: FormGroup;
  prioridades: PriorityDTO_In[] = [];

  constructor(
    public dialog: MatDialog,
    private _tareaService: TareaService,
    private _prioridadService : PriorityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = this.router.url.includes('edit');
      console.log(this.id)
      if (this.editMode) {
        this.title = 'Editar tarea';
      }
      if (!this.id && this.editMode) {
        this.goBack(); 
      }
    });
  }

  async ngOnInit() {
    this.crearFormulario();
    await this.obtenerPrioridades();
    if (this.editMode && this.id) {
      await this.obtenerTarea();
    }
  }

  private crearFormulario() {
    this.formTarea = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      prioridad: new FormControl('', [Validators.required]),
      filteredPrioridad: new FormControl('', []),
    });
  }

  private async obtenerTarea(){
    const tarea = await this._tareaService.taskDetail(this.id);
    this.formTarea.get('titulo')?.setValue(tarea?.title);
    this.formTarea.get('descripcion')?.setValue(tarea?.description);
    this.formTarea.get('prioridad')?.setValue(tarea?.priority_id);
  }

  private async obtenerPrioridades() {
    this.prioridades = await this._prioridadService.getAllPriority();
  }
  
  async onSubmit() {
    if (this.formTarea.valid) {
      const tarea = this.mapearTarea();
  
      if (this.editMode) {
        tarea.modified_at = new Date().toISOString();
        const tareaBuscada = await this._tareaService.taskDetail(this.id);
        tarea.state_id = tareaBuscada?.state_id ?? 0;
        tarea.created_at = tareaBuscada?.created_at ?? '';

        this._tareaService.updateTask(tarea)
          .then(() => this.goBack())
          .catch((error) => this.mostrarError(error));
      } else {
        tarea.created_at = new Date().toISOString();
        console.log(tarea, 'Tarea creada');
        this._tareaService.createTask(tarea)
          .then(() => this.goBack())
          .catch((error) => this.mostrarError(error));
      }
    } else {
      this.formTarea.markAllAsTouched();
    }
  }
  
  private mostrarError(error: any) {
    this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      data: {
        titulo: 'Atención',
        mensaje: error.message || 'Ocurrió un error inesperado',
      },
    });
  }

  
  private mapearTarea(): TaskDTO_Out {
    return {
      id_task: this.id ?? 0,
      title: this.formTarea.get('titulo')?.value?.toString() ?? '',
      description: this.formTarea.get('descripcion')?.value?.toString() ?? '',
      priority_id: parseInt(this.formTarea.get('prioridad')?.value, 10) || 0,
      state_id: null,
      created_at: '',
      modified_at: null,
      completed_at: null,
    };
  }
  

  errorMessage(controlName: string): string {
    const control: FormControl = this.formTarea.get(controlName) as FormControl;
    return !control
      ? ''
      : control.hasError('required')
      ? 'Este campo es obligatorio'
      : '';
  }

  goBack(): void {
    this.router.navigate(['/tareas']);
  }
}