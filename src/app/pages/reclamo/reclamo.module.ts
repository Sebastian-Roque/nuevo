import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReclamoPageRoutingModule } from './reclamo-routing.module';
import { ReclamoPage } from './reclamo.page';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReclamoPageRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  declarations: [ReclamoPage]
})
export class ReclamoPageModule {}
