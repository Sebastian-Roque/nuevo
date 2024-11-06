export interface Sucursal {
    id?: string;             // ID único de la sucursal
    name: string;            // Nombre de la sucursal
    address: string;         // Dirección de la sucursal
    phone: string;           // Teléfono de contacto
    createdAt?: Date;        // Fecha de creación
}