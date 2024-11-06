export interface Comentario {
    id?: string;             // ID único del comentario
    userId: string;          // ID del usuario que realiza el comentario
    sucursalId: string;      // ID de la sucursal a la que pertenece el comentario
    content: string;         // Contenido del comentario
    rating: number;          // Calificación (por ejemplo, de 1 a 5)
    createdAt?: Date;        // Fecha de creación
}