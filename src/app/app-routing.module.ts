import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Asegúrate de que estos guards estén implementados

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),

  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./pages/sucursal/sucursal.module').then(m => m.SucursalPageModule),
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then(m => m.ComentariosPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule),
  },
  {
    path: 'create-sucursal',
    loadChildren: () => import('./pages/create-sucursal/create-sucursal.module').then(m => m.CreateSucursalPageModule)
  },
  {
    path: 'ver-sucursal/:id', 
    loadChildren: () => import('./pages/ver-sucursal/ver-sucursal.module').then(m => m.VerSucursalPageModule)
  },
  {
    path: 'reclamo',
    loadChildren: () => import('./pages/reclamo/reclamo.module').then(m => m.ReclamoPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then(m => m.ServiciosPageModule)
  },
  {
    path: 'quienes-somos',
    loadChildren: () => import('./pages/quienes-somos/quienes-somos.module').then(m => m.QuienesSomosPageModule)
  },
  {
    path: 'ayuda-al-cliente',
    loadChildren: () => import('./pages/ayuda-al-cliente/ayuda-al-cliente.module').then(m => m.AyudaAlClientePageModule)
  },
  {
    path: 'mis-comentarios',
    loadChildren: () => import('./pages/mis-comentarios/mis-comentarios.module').then(m => m.MisComentariosPageModule)
  },
  {
    path: 'comentarios-sucursal',
    loadChildren: () => import('./pages/comentarios-sucursal/comentarios-sucursal.module').then(m => m.ComentariosSucursalesPageModule)
  },
  {
    path: 'ver-reclamo',
    loadChildren: () => import('./pages/ver-reclamo/ver-reclamo.module').then(m => m.VerReclamoPageModule)
  },
  {
    path: 'ver-usuarios',
    loadChildren: () => import('./pages/ver-usuarios/ver-usuarios.module').then(m => m.VerUsuariosPageModule)
  },
  {
    path: 'ver-comentarios-general',
    loadChildren: () => import('./pages/ver-comentarios-general/ver-comentarios-general.module').then(m => m.VerComentariosGeneralPageModule),
  },
  {
    path: 'personalizacion',
    loadChildren: () => import('./pages/personalizacion/personalizacion.module').then(m => m.PersonalizacionPageModule),
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
