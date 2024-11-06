import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

// Importar los módulos de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MejoresLocalesComponent } from 'src/app/components/mejores-locales/mejores-locales.component';
import { PeoresLocalesComponent } from 'src/app/components/peores-locales/peores-locales.component';
import { ComentariosPopularesComponent } from 'src/app/components/comentarios-populares/comentarios-populares.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Importa IonicModule aquí para los componentes de Ionic
    HomePageRoutingModule,
    // Agregar los módulos importados de Angular Material
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule, // Importar ReactiveFormsModule para formularios reactivos
  ],
  declarations: [
    HomePage,
    MejoresLocalesComponent,
    PeoresLocalesComponent,
    ComentariosPopularesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega el esquema para permitir elementos personalizados
})
export class HomePageModule {}
