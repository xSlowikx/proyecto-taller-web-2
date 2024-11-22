import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/toolbar';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { HeaderComponent } from './pages/header/header.component';
import { AddEditTareaComponent } from './pages/tarea/components/add-edit-tarea/add-edit-tarea.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { TareaModule } from './pages/tarea/tarea.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCheckbox } from '@angular/material/checkbox';
import { EliminarDialogComponent } from './components/eliminar-dialog/eliminar-dialog.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    HeaderComponent
    
  ],
  imports: [
    TareaModule,
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatIconModule,
    AddEditTareaComponent,
    HttpClientModule,
    MatCheckbox,
    MatButtonModule,
    EliminarDialogComponent,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
