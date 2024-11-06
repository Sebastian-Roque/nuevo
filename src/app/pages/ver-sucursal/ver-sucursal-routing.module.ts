import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerSucursalPage } from './ver-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: VerSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerSucursalPageRoutingModule {}
