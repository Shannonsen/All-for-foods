import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
/**
 * Clase que representa el listado de recetas.
 */
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  @Input() products: Food[] = [];
  users: User[] = [];
  token: any = "";

  /**
   * @constructor
   * @param {UserService} userService : Servicio de usuarios
   */
  constructor(private userService: UserService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.token = localStorage.getItem('Token');
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  /**
   * Método que se encarga de buscar el nombre del autor con el id proporcionado.
   * @param {number} authorId : Id del autor
   * @returns {string} nombre del autor.
   */
  getAuthorName(authorId: number): string {
    const author = this.users.find(user => user.id === authorId);
    return author?.user || '';
  }

  /**
   * Método que se encarga de cambiar el color del elemento <i> cuando es clickeado.
   * El elemento es obtenido a través de un id.
   * @param {number} id : id del elemento <i>
   */
  changeColor(id: number) {
    const heart = document.getElementById(String(id))!;
    if (heart.style.color == "red") {
      heart.style.color = "gray";
      heart.style.scale = "1";
    } else {
      heart.style.color = "red";
      heart.style.scale = "1.2";
    }
  }

}
