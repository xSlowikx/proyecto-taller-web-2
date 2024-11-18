import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';  // Asegúrate de importar NgForm
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule]
 
})
export class LoginComponent {
  constructor(private router: Router, private _authService: AuthService) {}


  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    try{
      const response = this._authService.login({username, password})
      if(response != null){
        this.router.navigate(['/tareas']);
      }
    } catch (err) {
      console.log('AAAAAAAAAAAAA', err)
    }
    
    //
  }
}