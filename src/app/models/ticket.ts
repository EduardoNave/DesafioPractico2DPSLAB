export class Ticket {
    $key: string;
    uid: string;
    propietario: string;
    petName: string;
    tratamiento: string;
    medicamento: string;
    costo: number;
    visita: number = 0;
    descuento: number;
    descuentoAplicado: string;
}