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
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public ticketService: TicketService,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.ticketService.getTickets();
    this.resetForm();
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
