import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Usuario {
  Apellido: string;
  Correo: string;
  Nombre: string;
  NombreUsuario: string;
  Password: string;
  PreguntaSeguridad: string;
  RespuestaSeguridad: string;
  Rol: string;
  id: string;
  NombreEmpresa?: string;
  DireccionEmpresa?: string;
  TelefonoEmpresa?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore) {
    this.usuariosCollection = afs.collection<Usuario>('users');
  }

  addUsuario(usuario: Usuario): Promise<void> {
    const userRef = this.usuariosCollection.doc(usuario.id);
    return userRef.set(usuario);
  }

  isUsernameTaken(username: string): Observable<boolean> {
    return this.afs
      .collection<Usuario>('users', ref => ref.where('NombreUsuario', '==', username))
      .valueChanges()
      .pipe(
        take(1),
        map(users => users.length > 0)
      );
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.afs
      .collection<Usuario>('users', ref => ref.where('Correo', '==', email))
      .valueChanges()
      .pipe(
        take(1),
        map(users => users.length > 0)
      );
  }

  getUserByUsername(username: string): Observable<Usuario | null> {
    return this.afs
      .collection<Usuario>('users', ref => ref.where('NombreUsuario', '==', username))
      .valueChanges()
      .pipe(
        take(1),
        map(users => (users.length > 0 ? users[0] : null))
      );
  }

  validateSecurityQuestion(username: string, securityAnswer: string): Observable<boolean> {
    return this.getUserByUsername(username).pipe(
      map(user => user ? user.RespuestaSeguridad === securityAnswer : false)
    );
  }

  updatePassword(username: string, newPassword: string): Promise<void> {
    return this.getUserByUsername(username)
      .pipe(take(1))
      .toPromise()
      .then(user => {
        if (user) {
          const userRef = this.afs.doc<Usuario>(`users/${user.id}`);
          return userRef.update({ Password: newPassword });
        } else {
          return Promise.reject('Usuario no encontrado');
        }
      });
  }
}
