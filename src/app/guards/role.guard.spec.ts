
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';

describe('RoleGuard', () => {
  let roleGuard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    roleGuard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if user role is in allowedRoles', (done) => {
    const routeMock: any = { data: { roles: ['admin', 'usuario'] } };
    authService.getUserRole.and.returnValue(of('admin'));

    roleGuard.canActivate(routeMock).subscribe(isAuthorized => {
      expect(isAuthorized).toBeTrue();
      done();
    });
  });

  it('should deny access if user role is not in allowedRoles', (done) => {
    const routeMock: any = { data: { roles: ['admin'] } };
    authService.getUserRole.and.returnValue(of('usuario'));

    roleGuard.canActivate(routeMock).subscribe(isAuthorized => {
      expect(isAuthorized).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
      done();
    });
  });

  it('should deny access and navigate to /unauthorized if user role is null', (done) => {
    const routeMock: any = { data: { roles: ['admin'] } };
    authService.getUserRole.and.returnValue(of(null));

    roleGuard.canActivate(routeMock).subscribe(isAuthorized => {
      expect(isAuthorized).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
      done();
    });
  });
});