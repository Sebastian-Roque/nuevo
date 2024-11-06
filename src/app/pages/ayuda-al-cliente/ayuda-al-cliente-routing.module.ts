import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudaAlClientePage } from './ayuda-al-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: AyudaAlClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudaAlClientePageRoutingModule {}
