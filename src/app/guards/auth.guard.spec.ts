import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: () => of(true) // Cambia `true` a `false` para probar otros casos
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate') // Simula el método `navigate`
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is authenticated', (done) => {
    // Simulamos el retorno de `true` para `isAuthenticated`
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should deny access and navigate to login if user is not authenticated', (done) => {
    // Simulamos el retorno de `false` para `isAuthenticated`
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verifica que `navigate` fue llamado con `/login`
      done();
    });
  });
});
