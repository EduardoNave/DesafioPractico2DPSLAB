import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//Service
import { UserService } from '../../services/user.service';
import { AuthService } from "../../services/auth.service";

// Class
import { User } from '../../models/user';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
    //this.userService.getUsers();
    this.resetForm();
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(userForm: NgForm) {
    if (userForm.value.uid == null)
      this.userService.insertUser(userForm.value);
    else
      this.userService.updateUser(userForm.value);

    this.resetForm(userForm);
    this.toastr.success('Se han guardado los cambios en la base de datos', 'Registro Actualizado');
  }

   // Para limpiar el formulario
   resetForm(userForm?: NgForm) {
    if (userForm != null)
      userForm.reset();
    this.userService.selectedUser = new User();
  }

}
