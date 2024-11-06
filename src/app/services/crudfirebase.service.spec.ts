import { TestBed } from '@angular/core/testing';
import { CrudFirebaseService } from './crudfirebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CrudFirebaseService', () => {
  let service: CrudFirebaseService;
  let afAuthMock: any;
  let routerMock: any;

  beforeEach(() => {
    // Crear un mock de AngularFireAuth
    afAuthMock = {
      createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({ user: {} })),
      currentUser: Promise.resolve({ delete: jasmine.createSpy('delete') }),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve())
    };

    // Crear un mock del Router
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        CrudFirebaseService,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(CrudFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new user', async () => {
    await service.addUser('test@example.com', 'password123');
    expect(afAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should delete the current user', async () => {
    await service.deleteUser();
    expect(afAuthMock.currentUser).toBeDefined();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should get the current user', async () => {
    const user = await service.getUser();
    expect(user).toBeDefined();
  });

  it('should sign out the user', async () => {
    await service.signOut();
    expect(afAuthMock.signOut).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
