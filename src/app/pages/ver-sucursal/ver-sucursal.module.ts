import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerSucursalPageRoutingModule } from './ver-sucursal-routing.module';
import { VerSucursalPage } from './ver-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerSucursalPageRoutingModule,
  ],
  declarations: [VerSucursalPage]
})
export class VerSucursalPageModule {}
