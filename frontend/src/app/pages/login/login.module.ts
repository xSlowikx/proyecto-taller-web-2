// login.module.ts
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";  // Asegúrate de importar el componente

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
    ]
})
export class LoginModule {}