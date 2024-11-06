import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Importamos los modelos
import { User } from '../models/user.model';
import { Sucursal } from '../models/sucursal.model';
import { Reclamo } from '../models/reclamo.model';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class CrudFirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // ------------- USUARIOS -------------
  createUser(user: User): Promise<void> {
    const userRef = this.firestore.collection('users').doc(user.uid);
    return userRef.set(user);
  }

  getUserById(uid: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(uid).valueChanges();
  }

  updateUser(uid: string, data: Partial<User>): Promise<void> {
    return this.firestore.collection('users').doc(uid).update(data);
  }

  deleteUser(uid: string): Promise<void> {
    return this.firestore.collection('users').doc(uid).delete();
  }

  // ------------- SUCURSALES -------------
  createSucursal(sucursal: Sucursal): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('sucursales').doc(id).set({ ...sucursal, id });
  }

  getSucursales(): Observable<Sucursal[]> {
    return this.firestore.collection<Sucursal>('sucursales').valueChanges();
  }

  getSucursalById(id: string): Observable<Sucursal | undefined> {
    return this.firestore.collection<Sucursal>('sucursales').doc(id).valueChanges();
  }

  updateSucursal(id: string, data: Partial<Sucursal>): Promise<void> {
    return this.firestore.collection('sucursales').doc(id).update(data);
  }

  deleteSucursal(id: string): Promise<void> {
    return this.firestore.collection('sucursales').doc(id).delete();
  }

  // ------------- RECLAMOS -------------
  createReclamo(reclamo: Reclamo): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('reclamos').doc(id).set({ ...reclamo, id });
  }

  getReclamos(): Observable<Reclamo[]> {
    return this.firestore.collection<Reclamo>('reclamos').valueChanges();
  }

  getReclamoById(id: string): Observable<Reclamo | undefined> {
    return this.firestore.collection<Reclamo>('reclamos').doc(id).valueChanges();
  }

  updateReclamo(id: string, data: Partial<Reclamo>): Promise<void> {
    return this.firestore.collection('reclamos').doc(id).update(data);
  }

  deleteReclamo(id: string): Promise<void> {
    return this.firestore.collection('reclamos').doc(id).delete();
  }

  // ------------- COMENTARIOS -------------
  createComentario(comentario: Comentario): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('comentarios').doc(id).set({ ...comentario, id });
  }

  getComentarios(): Observable<Comentario[]> {
    return this.firestore.collection<Comentario>('comentarios').valueChanges();
  }

  getComentarioById(id: string): Observable<Comentario | undefined> {
    return this.firestore.collection<Comentario>('comentarios').doc(id).valueChanges();
  }

  updateComentario(id: string, data: Partial<Comentario>): Promise<void> {
    return this.firestore.collection('comentarios').doc(id).update(data);
  }

  deleteComentario(id: string): Promise<void> {
    return this.firestore.collection('comentarios').doc(id).delete();
  }
}
