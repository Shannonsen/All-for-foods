import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('Token');
  }

  /**
   * Método lanzado para eliminar token y cerrar sesión que redirecciona a home.
   */
  logout(){
    this.router.navigate(['home']).then(() => {
      localStorage.removeItem("Token");
      window.location.reload();
    });
  }

}
