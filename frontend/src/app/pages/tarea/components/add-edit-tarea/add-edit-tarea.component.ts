import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectDTO_In } from '../../../../core/models/select/select.model';
import { TareaService } from '../../../../core/services/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaDTO_Out } from '../../../../core/models/tarea/tarea.model';
import { ErrorDialogComponent } from '../../../../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../header/header.component';

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
  prioridades: SelectDTO_In[] = [];
  filteredPrioridades: SelectDTO_In[] = [];

  constructor(
    public dialog: MatDialog,
    private _tareaService: TareaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Acceder al parámetro 'id' de la URL
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // Convertir el id a número
      this.editMode = this.router.url.includes('edit');
      if (this.editMode) {
        this.title = 'Editar tarea';
      }
      if (!this.id && this.editMode) {
        this.goBack(); // Si no hay id y se está en modo edición, volver
      }
    });

    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTarea = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      prioridad: new FormControl('', [Validators.required]),
      filteredPrioridad: new FormControl('', []),
    });
  }

  onSubmit() {
    if (this.formTarea.valid) {
      let tarea = this.mapearTarea();
      if (this.editMode) {
        this._tareaService
          .updateTask(tarea)
          .then(() => this.goBack())
          .catch((e) => {
            this.dialog.open(ErrorDialogComponent, {
              width: '600px',
              data: {
                titulo: 'Atención',
                mensaje: e,
              },
            });
          });
      } else {
        this._tareaService
          .creatTask(tarea)
          .then(() => this.goBack())
          .catch((e) => {
            this.dialog.open(ErrorDialogComponent, {
              width: '600px',
              data: {
                titulo: 'Atención',
                mensaje: e,
              },
            });
          });
      }
    } else {
      this.formTarea.markAllAsTouched();
    }
  }

  private mapearTarea(): TareaDTO_Out {
    let tarea: TareaDTO_Out = {
      id_task: this.id ?? 0,
      title: this.formTarea.get('titulo')?.value.toString() ?? '',
      description: this.formTarea.get('descripcion')?.value.toString() ?? '',
      user_id: this.user, // ver cómo traerlo
      priority_id: this.formTarea.get('prioridad')?.value.toString() ?? '',
      state_id: null // En back se modifica
    };
    return tarea;
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