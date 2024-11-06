import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateSucursalPageRoutingModule } from './create-sucursal-routing.module';
import { CreateSucursalPage } from './create-sucursal.page';

// Importar los módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Importar ReactiveFormsModule para formularios reactivos
    IonicModule,
    CreateSucursalPageRoutingModule,
    MatFormFieldModule, // Importar MatFormFieldModule
    MatInputModule,     // Importar MatInputModule
    MatDatepickerModule, // Importar MatDatepickerModule
    MatNativeDateModule, // Importar MatNativeDateModule
    MatButtonModule,    // Importar MatButtonModule si utilizas botones de Angular Material
  ],
  declarations: [CreateSucursalPage]
})
export class CreateSucursalPageModule {}
