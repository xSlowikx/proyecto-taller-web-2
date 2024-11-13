import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';  // Asegúrate de importar NgForm
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule]
 
})
export class LoginComponent {
  constructor(private router: Router) {}


  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log('Email:', email, 'Password:', password);
    this.router.navigate(['/tareas']);
  }
}