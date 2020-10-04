import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//Service
import { TicketService } from '../../services/ticket.service';
import { AuthService } from "../../services/auth.service";

// Class
import { Ticket } from '../../models/ticket';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  ticketList: Ticket[];

  constructor(
    public authService: AuthService,
    public ticketService: TicketService,
    public toastr: ToastrService
  ) { }

  /* 
    Cuando cargue la aplicación, que reciba toda la información con el método 'getProducts' del servicio de firebase
     pero ademas que utilice el metodo 'snapshotChanges' para estar atento a los cambios que tengas los datos en la
     base de datos de firebase, para recorrerlo con forEach. 
  
     Cada dato lo obtengo 'payload' y lo convierto en formato JSON y lo asigno a la variable 'x'
     let x = element.payload.toJSON();
  
     Se le asigna por cada elemento la llave de cada registro, en una propiedad llamada '$key'
     por que se necesita para luego eliminar el registro
     x["$key"] = element.key;
  
     Cuando ya se tiene el elemento se asigna a mi arreglo 'ticketList' para ser mostrado en mi pantalla list
     this.ticketList.push(x as Product);
*/
  ngOnInit() {
    return this.ticketService.getTickets()
      .snapshotChanges().subscribe(item => {
        this.ticketList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.ticketList.push(x as Ticket);
        });
      });
  }

  /* 
   Recibe una varible de tipo 'Product' para invocar el servicio de firebase, para actualizarlo
   Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, product)'  
  */
  onEdit(ticket: Ticket) {
    this.ticketService.selectedTicket = Object.assign({}, ticket);
  }

  /* 
   Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deleteProduct' del servicio de firebase
   ademas muestra un 'warning' con toastr
*/
  onDelete($key: string) {
    if (confirm('¿Está seguro de eliminar el registro?')) {
      this.ticketService.deleteProduct($key);
      this.toastr.warning('Se ha eliminado el registro exitosamente', 'Ticket removido');
    }
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(ticketForm: NgForm) {
    if (ticketForm.value.$key == null)
      this.ticketService.insertTicket(ticketForm.value);
    else
      this.ticketService.updateTicket(ticketForm.value);

    this.resetForm(ticketForm);
    this.toastr.success('Consulta realizada exitosamente', 'Ticket registrado');
  }

  // Para limpiar el formulario
  resetForm(ticketForm?: NgForm) {
    if (ticketForm != null)
      ticketForm.reset();
    this.ticketService.selectedTicket = new Ticket();
  }

}
