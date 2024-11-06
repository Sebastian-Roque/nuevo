import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { MisComentariosPageRoutingModule } from './mis-comentarios-routing.module';

import { MisComentariosPage } from './mis-comentarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agregar ReactiveFormsModule aquí
    IonicModule,
    MisComentariosPageRoutingModule
  ],
  declarations: [MisComentariosPage]
})
export class MisComentariosPageModule {}
