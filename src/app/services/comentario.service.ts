import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  // Datos simulados de comentarios almacenados en un BehaviorSubject para emitir actualizaciones en tiempo real
  private comentariosSimulados = [
    {
      sucursalId: '1',
      comentarios: [
        {
          usuario: 'Juan Pérez',
          descripcion: 'Excelente servicio.',
          fecha: new Date('2024-09-25'),
          evaluacion: 5,
        },
        {
          usuario: 'Ana Gómez',
          descripcion: 'Buena atención, pero se puede mejorar.',
          fecha: new Date('2024-09-26'),
          evaluacion: 4,
        },
      ],
    },
    {
      sucursalId: '2',
      comentarios: [
        {
          usuario: 'Carlos López',
          descripcion: 'Muy buen ambiente.',
          fecha: new Date('2024-09-27'),
          evaluacion: 5,
        },
      ],
    },
  ];

  // BehaviorSubject para emitir actualizaciones en tiempo real
  private comentariosSubject = new BehaviorSubject<any[]>(this.comentariosSimulados);

  constructor() {}

  // Método para obtener los comentarios por ID de sucursal
  getComentariosBySucursalId(sucursalId: string): Observable<any[]> {
    const sucursalComentarios = this.comentariosSimulados.find(
      (sucursal) => sucursal.sucursalId === sucursalId
    );
    return of(sucursalComentarios ? [...sucursalComentarios.comentarios] : []);
  }

  // Método para agregar un comentario a una sucursal específica
  addCommentToSucursal(sucursalId: string, comentario: any): Observable<void> {
    let sucursal = this.comentariosSimulados.find(
      (suc) => suc.sucursalId === sucursalId
    );

    if (sucursal) {
      sucursal.comentarios.push(comentario);
    } else {
      // Si la sucursal no existe, crear una nueva entrada
      this.comentariosSimulados.push({
        sucursalId,
        comentarios: [comentario],
      });
    }

    // Emitir los comentarios actualizados en el BehaviorSubject
    this.comentariosSubject.next(this.comentariosSimulados);

    return of();
  }

  // Observable que emite los comentarios actualizados en tiempo real
  getComentariosUpdates(): Observable<any[]> {
    return this.comentariosSubject.asObservable();
  }
}
