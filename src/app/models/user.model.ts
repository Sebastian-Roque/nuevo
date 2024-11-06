export interface User {
    uid?: string;            // ID único del usuario
    email: string;           // Correo electrónico
    displayName?: string;    // Nombre visible del usuario
    photoURL?: string;       // URL de la foto de perfil
    phoneNumber?: string;    // Número de teléfono del usuario
    role?: string;           // Rol del usuario (admin, user, etc.)
    createdAt?: Date;        // Fecha de creación
}