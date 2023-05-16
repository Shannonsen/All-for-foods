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
}
