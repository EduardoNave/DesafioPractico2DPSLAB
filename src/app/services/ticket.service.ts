import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // Traer los datos de firebase
  ticketList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo Ticket
  selectedTicket: Ticket = new Ticket();

  constructor(private firebase: AngularFireDatabase) { }

   // Traer todos los productos desde firebase 
   getTickets() { // guarda los elementos en la varible 'products'
   return this.ticketList = this.firebase.list('tickets');
 }

  // crear un nuevo ticket  , recibiendo un parametro de tipo ticket
  insertTicket(ticket: Ticket) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo ticket , puede acceder a sus propiedades
    this.ticketList.push({
      duiP: ticket.duiP,
      petName: ticket.petName,
      tratamiento: ticket.tratamiento,
      medicamento: ticket.medicamento,
      costo: ticket.costo,
      visita: ticket.visita
    });
  }

  // Actualiza un ticket, recibiendo un parametro de tipo ticket
  updateTicket(ticket: Ticket) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.ticketList.update(ticket.$key, {
      duiP: ticket.duiP,
      petName: ticket.petName,
      tratamiento: ticket.tratamiento,
      medicamento: ticket.medicamento,
      costo: ticket.costo,
      visita: ticket.visita
    });
  }

  // Elimina un ticket, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteProduct($key: string) {
    this.ticketList.remove($key);
  }


}
