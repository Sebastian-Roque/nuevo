import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariosSucursalPage } from './comentarios-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComentariosSucursalesPageRoutingModule {}