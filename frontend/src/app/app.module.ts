import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { MatToolbarModule } from '@angular/material/toolbar';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { HeaderComponent } from './pages/header/header.component';
import { AddEditTareaComponent } from './pages/tarea/add-edit-tarea/add-edit-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    HeaderComponent,
    AddEditTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
