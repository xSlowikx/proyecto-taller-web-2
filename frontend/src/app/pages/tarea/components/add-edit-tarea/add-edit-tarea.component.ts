import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectDTO_In } from '../../../../core/models/select/select.model';
import { TareaService } from '../../../../core/services/tarea.service';
import { Router } from '@angular/router';
import { TareaDTO_Out } from '../../../../core/models/tarea/tarea.model';
import { ErrorDialogComponent } from '../../../../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-tarea',
  templateUrl: './add-edit-tarea.component.html',
  styleUrl: './add-edit-tarea.component.scss',
})
export class AddEditTareaComponent {
  id: number = 0;
  user: number = 0;
  editMode: boolean = false;
  title: string = 'Crear tarea';
  formTarea!: FormGroup;
  prioridades: SelectDTO_In[] = [];

  constructor(
    public dialog: MatDialog,
    private _tareaService: TareaService,
    //private _prioridadService: PrioridadService,
    private router: Router
  ) {
    this.editMode = this.router.url.includes('edit');
    if (
      this.editMode &&
      !this.router.getCurrentNavigation()?.extras.state?.['id']
    )
      this.goBack();
    this.id = this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (this.editMode) {
      this.title = 'Editar Tarea';
    }
    if (!this.id && this.editMode) {
      this.goBack();
    }
  }

  ngOnInit() {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTarea = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      prioridad: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(){
    if(this.formTarea.valid){
      let tarea = this.mapearTarea();
      if(this.editMode){
        this._tareaService
        .editarTarea(tarea)
        .then((x) => this.goBack())
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
          .crearTarea(tarea)
          .then((x) => this.goBack())
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

  private mapearTarea() : TareaDTO_Out {
    let tarea: TareaDTO_Out = {
      id_task: this.id ?? 0,
      title: this.formTarea.get('titulo')?.value.toString() ?? '',
      description: this.formTarea.get('descripcion')?.value.toString() ?? '',
      user_id: this.user, // ver como traerlo 
      priority_id: this.formTarea.get('prioridad')?.value.toString() ?? '',
    }
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
    this.router.navigate(['/tarea']);
  }
}
