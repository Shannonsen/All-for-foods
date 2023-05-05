import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/views/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';
/**
 * Clase que representa el listado de los usuarios seguidos.
 */
@Component({
  selector: 'app-list-follows',
  templateUrl: './list-follows.component.html',
  styleUrls: ['./list-follows.component.scss']
})
export class ListFollowsComponent implements OnInit {

  @Input() follows: number[] = [];
  users: User[] = []

  /**
   *@constructor
   * @param {UserService} userService : Servicio de usuarios.
   */
  constructor(private userService: UserService) {
  }

  /**
   * @override
   */
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  /**
   *Método que se encarga de encontrar el username de un usuario a través de un id.
   * @param {number} id : id de usuario.
   * @returns {string} : nombre del usuario.
   */
  getUserById(id: number): string {
    const author = this.users.find(user => user.id === id);
    return author?.username || '';
  }

  /**
   *
   * @param {number} id: id del usuario
   * @returns {string}: link del url de la imagen del usuario
   */
  getUserIcon(id: number): string{
    const user = this.users.find(user => user.id === id);
    return user?.icon || '';
  }

}
