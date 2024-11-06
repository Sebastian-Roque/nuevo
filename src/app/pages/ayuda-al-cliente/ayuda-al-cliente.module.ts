import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AyudaAlClientePageRoutingModule } from './ayuda-al-cliente-routing.module';
import { AyudaAlClientePage } from './ayuda-al-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    IonicModule,
    AyudaAlClientePageRoutingModule
  ],
  declarations: [AyudaAlClientePage]
})
export class AyudaAlClientePageModule {}
