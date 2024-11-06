import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSucursalPage } from './create-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSucursalPageRoutingModule {}
