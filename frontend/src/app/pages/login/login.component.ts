import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
 
})
export class LoginComponent {
  formLogin!: FormGroup;
  constructor(private router: Router) {}

  registro(){
    this.router.navigate(['/registro'])
  }
  ngOnInit(): void {
  this.formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  }
  
  public login(): void {
    if (this.formLogin.valid) {
      console.log('Formulario enviado:', this.formLogin.value);
      this.router.navigate(['/tareas']);
    } else {
      console.log('Formulario no válido');
    }
  }
}