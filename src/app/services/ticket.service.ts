import { query } from '@angular/animations';
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

  descuento: number;
  descuentoAplicado: string;


  constructor(private firebase: AngularFireDatabase) { }

  // Traer todos los productos desde firebase 
  getTickets() {
    //se filtra la lista para obtener todos los tickets
    return this.ticketList = this.firebase.list("tickets");
  }

  misTickets(uid: string) {
    //se filtra la lista para obtener únicamente los tickets realizados por el usuario activo
    return this.ticketList = this.firebase.list("tickets", ref => ref.orderByChild('uid').equalTo(uid));
  }

  misVisitas(uid: string) {
    //se filtra la lista para obtener únicamente los tickets realizados por el usuario activo
    this.ticketList = this.firebase.list("tickets", ref => ref.orderByChild('uid').equalTo(uid).limitToLast(1));
    if (!this.ticketList) {
      return this.ticketList = this.firebase.list("tickets", ref => ref.orderByChild('uid').limitToFirst(1));
    } else {
      return this.ticketList = this.firebase.list("tickets", ref => ref.orderByChild('uid').equalTo(uid).limitToLast(1));
    }
  }


  // crear un nuevo ticket  , recibiendo un parametro de tipo ticket
  insertTicket(ticket: Ticket) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo ticket , puede acceder a sus propiedades
    this.ticketList.push({
      uid: ticket.uid,
      propietario: ticket.propietario,
      petName: ticket.petName,
      tratamiento: ticket.tratamiento,
      medicamento: ticket.medicamento,
      visita: ticket.visita + 1,
      descuento: this.obtenerDescuento(ticket.visita.valueOf()),
      descuentoAplicado: this.tipoDescuento(ticket.visita).toString(),
      costo: ticket.costo*this.descuento
    });
  }

  validarVisita(ticket: Ticket){
    if (ticket.visita = null) {
      return 1;
    } else {
      return ticket.visita =+ 1;
    }
  }

  tipoDescuento(visita: number){
    if (visita == 1) {
      return this.descuentoAplicado = "Descuento del 2%";
    } else {
      if (visita > 4 || visita == 4) {
        return this.descuentoAplicado = "Descuento del 8%";
      } else {
        return this.descuentoAplicado = "";
      }
    }
  }

  obtenerDescuento(visita: number){
    if (visita == 1) {
      return this.descuento = 0.95;
    } else {
      if (visita >= 4) {
        return this.descuento = 0.92;
      } else {
        return this.descuento = 1;
      }
    }
  }

  // Actualiza un ticket, recibiendo un parametro de tipo ticket
  updateTicket(ticket: Ticket) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.ticketList.update(ticket.$key, {
      uid: ticket.uid,
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
