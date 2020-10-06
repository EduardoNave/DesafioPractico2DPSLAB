import { Component, OnInit } from '@angular/core';

//Service
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { TicketService } from "../../services/ticket.service";

//Class
import { User } from '../../models/user';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  userList: User[];


  constructor(
    public authService: AuthService,
    public userService: UserService,
    public ticketService: TicketService
    ) { }

    ngOnInit() {
     /*  return this.userService.getUsers()
        .snapshotChanges().subscribe(item => {
          this.userList = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.userList.push(x as User);
          });
        }); */
    }

    mostrarInfo(param: string){
      return this.userService.getUser(param).snapshotChanges().subscribe(item => {
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.userList.push(x as User);
        });
      });
    }
    

}
