import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;

  duiUser: string = "";

  selectedUser: User = new User();

  constructor(public firebase: AngularFireDatabase) { }

  // Traer todos los productos desde firebase 
  getUsers() {
    //se filtra la lista para obtener únicamente los tickets realizados por el usuario activo
    return this.userList = this.firebase.list("users");
  }

  getUser(uid: string) {
    //se filtra la lista para obtener únicamente los tickets realizados por el usuario activo
    return this.userList = this.firebase.list("users", ref => ref.orderByChild("uid").equalTo(uid).limitToFirst(1));
  }

  // crear un nuevo user  , recibiendo un parametro de tipo user
  insertUser(user: User) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo user , puede acceder a sus propiedades
    this.userList.push({
      uid: user.uid,
      displayName: user.displayName,
      dui: user.dui,
      email: user.email,
      photoURL: user.photoURL,
      petName: user.petName
    });
  }

  // Actualiza un user, recibiendo un parametro de tipo user
  updateUser(user: User) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.userList.update(user.uid, {
      email: user.displayName,
      photoURL: user.photoURL,
      dui: user.dui,
      petName: user.petName
    });
  }

  // Elimina un user, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteUser(uid: string) {
    this.userList.remove(uid);
  }
}
