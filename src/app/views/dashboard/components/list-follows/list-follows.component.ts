import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/views/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
/**
 * Clase que representa el listado de los usuarios seguidos.
 */
@Component({
  selector: 'app-list-follows',
  templateUrl: './list-follows.component.html',
  styleUrls: ['./list-follows.component.scss']
})
export class ListFollowsComponent implements OnInit {

  follows: User[] = [];
  users: User[] = []

  /**
   *@constructor
   * @param {UserService} userService : Servicio de usuarios.
   */
  constructor(private userService: UserService, private cookieService: CookieService) {
  }

  /**
   * @override
   */
  ngOnInit(): void {
    var idUser = this.cookieService.get('idUser');
    this.userService.getFollowings(Number(idUser)).subscribe(followings => {
      this.follows = followings.data
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
  getUserIcon(id: number): string {
    const user = this.users.find(user => user.id === id);
    return user?.icon || '';
  }

}
