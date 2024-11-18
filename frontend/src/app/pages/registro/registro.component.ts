import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [ReactiveFormsModule] // Aquí ReactiveFormsModule es suficiente para formularios reactivos
})
export class RegistroComponent implements OnInit {
  formRegistro!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
   
    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  public registro(): void {
    if (this.formRegistro.valid) {
      console.log('Formulario enviado:', this.formRegistro.value);
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario no válido');
    }
  }
}
