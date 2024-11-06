// ver-comentarios-general-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComentariosGeneralPage } from './ver-comentarios-general.page';

const routes: Routes = [
  {
    path: '',
    component: ListaComentariosGeneralPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerComentariosGeneralPageRoutingModule {}
