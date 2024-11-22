import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: false
})
export class HeaderComponent {
  
    isTareasPage: boolean = false;
  
    constructor(private router: Router) {
    
      this.router.events.subscribe(() => {
        this.isTareasPage = this.router.url === '/tareas';
      });
    }
  
    agregar(){
      this.router.navigate(['/tareas/add']);
    }
    
    cerrarSesion(){
      this.router.navigate(['/login'])
    }
}
