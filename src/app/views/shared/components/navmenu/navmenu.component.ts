import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
/**
 * Clase que representa el navbar.
 */

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit {

  token: any = "";

  /**
   * @constructor
   * @param {Router} router : Servicio de navegación entre rutas
   */
  constructor(private router: Router, private cookieService: CookieService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.token = this.cookieService.get('Token');
  }

  /**
   * Método lanzado para eliminar token y cerrar sesión que redirecciona a home.
   */
  logout(){
    this.router.navigate(['home']).then(() => {
      this.cookieService.delete('Token');
      window.location.reload();
    });
  }

}
