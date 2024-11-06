import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { firstValueFrom, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string | null;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  // Método para registrar usuario con rol
  async register(email: string, password: string, role: string): Promise<void> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (credential.user) {
      await this.updateUserData(credential.user, role);
    }
  }

  // Método para iniciar sesión
  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  // Método para actualizar datos del usuario en Firestore
  private updateUserData(user: any, role: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      role: role,
    };
    return userRef.set(data, { merge: true });
  }

  // Método para obtener el usuario actual con su rol
  async getCurrentUser(): Promise<User | null> {
    const user = await firstValueFrom(this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    ));
    return user || null;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  // Método para obtener el rol del usuario actual
  getUserRole(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            map(userData => userData?.role || null)
          );
        } else {
          return of(null);
        }
      })
    );
  }
}
