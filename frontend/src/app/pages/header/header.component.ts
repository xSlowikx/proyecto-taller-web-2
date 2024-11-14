import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent {
    // Variable para comprobar la ruta
    isTareasPage: boolean = false;
  
    constructor(private router: Router) {
      // Verificar si estamos en la ruta /tareas
      this.router.events.subscribe(() => {
        this.isTareasPage = this.router.url === '/tareas';
      });
    }
  
    agregar(){
      this.router.navigate(['/tareas/add']);
    }
}
