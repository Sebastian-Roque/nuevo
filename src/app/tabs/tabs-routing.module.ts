import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'sucursales',
        loadChildren: () => import('../pages/sucursal/sucursal.module').then(m => m.SucursalPageModule)
      },
      {
        path: 'comentarios',
        loadChildren: () => import('../pages/comentarios/comentarios.module').then(m => m.ComentariosPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../pages/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
