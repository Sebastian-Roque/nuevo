// ver-comentarios-general.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerComentariosGeneralPageRoutingModule } from './ver-comentarios-general-routing.module';
import { ListaComentariosGeneralPage } from './ver-comentarios-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerComentariosGeneralPageRoutingModule,
  ],
  declarations: [ListaComentariosGeneralPage],
})
export class VerComentariosGeneralPageModule {}
