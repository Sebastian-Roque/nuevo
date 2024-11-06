export interface Reclamo {
    id?: string;             // ID único del reclamo
    userId: string;          // ID del usuario que realiza el reclamo
    description: string;     // Descripción del reclamo
    status: 'pending' | 'resolved'; // Estado del reclamo
    createdAt?: Date;        // Fecha de creación
}