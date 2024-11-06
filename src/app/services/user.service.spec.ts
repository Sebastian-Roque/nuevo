import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuariosCollection = this.firestore.collection<Usuario>('Usuario');

  constructor(private firestore: AngularFirestore) {}

  // Método para agregar un nuevo usuario con rol predeterminado "usuario"
  addUsuario(usuario: Usuario): Promise<void> {
    const id = this.firestore.createId();
    usuario.id = id;
    return this.usuariosCollection.doc(id).set(usuario);
  }

  // Método para obtener un usuario por su nombre de usuario
  getUserByUsername(username: string): Observable<Usuario | null> {
    return this.firestore.collection<Usuario>('Usuario', ref => ref.where('NombreUsuario', '==', username)).valueChanges().pipe(
      switchMap(users => of(users.length > 0 ? users[0] : null))
    );
  }

  // Método para actualizar la contraseña del usuario
  updatePassword(userId: string, newPassword: string): Promise<void> {
    return this.usuariosCollection.doc(userId).update({ Password: newPassword });
  }
}
