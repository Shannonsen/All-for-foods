import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
/**
 * Clase para el listado para la paginación de los usuarios
 */
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @Input() users: User[] = [];
  token: any = "";
  @Input() isPanel: string = ""

  /**
   * @constructor
   * @param {UserService} userService : Servicio de usuarios
   * @param {CookieService} cookieService : Servicio de cookies
   * @param {Router} router : Navegación de rutas.
   */
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.token = this.cookieService.get('Token');
  }

  /**
   * Método para eliminar un usuario
   * @param {number} id : id de usuario
   */
  deleteUser(id: number) {
    this.userService.deleteUser(id, this.token).subscribe(response => {
      if (response.message == "OK") {
        Swal.fire("CORRECTO", 'Usuario eliminado', 'success').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      } else {
        Swal.fire("ERROR", response.message, 'error').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

  /**
 * Método para activar un usuario
 * @param {number} id : id de usuario
 */
  activateUser(id: number) {
    this.userService.activeUser(id, this.token).subscribe(response => {
      if (response.message == "OK") {
        Swal.fire("CORRECTO", 'Usuario activado', 'success').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      } else {
        Swal.fire("ERROR", response.message, 'error').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

}
