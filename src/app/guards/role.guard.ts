
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Obtiene los roles permitidos para la ruta desde la configuración de datos
    const allowedRoles = route.data['roles'] as Array<string>;

    return this.authService.getUserRole().pipe(
      map((userRole: string | null) => {
        // Verifica si el rol del usuario está dentro de los roles permitidos
        return allowedRoles.includes(userRole || '');
      }),
      tap(isAuthorized => {
        if (!isAuthorized) {
          this.router.navigate(['/unauthorized']); // Redirige si no está autorizado
        }
      })
    );
  }
}
