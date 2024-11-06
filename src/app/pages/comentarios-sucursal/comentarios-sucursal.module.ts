
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComentariosSucursalPage } from './comentarios-sucursal.page';
import { ComentariosSucursalesPageRoutingModule } from './comentarios-sucursal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosSucursalesPageRoutingModule
  ],
  declarations: [ComentariosSucursalPage]
})
export class ComentariosSucursalesPageModule {}