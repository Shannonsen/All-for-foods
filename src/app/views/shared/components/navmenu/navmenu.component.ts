import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
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
  tokenType: any = "";

  /**
   * @constructor
   * @param {Router} router : Servicio de navegación entre rutas
   */
  constructor(private router: Router, private cookieService: CookieService, private loginService: LoginService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.token = this.cookieService.get('Token');
    this.loginService.type_auth(this.token).subscribe(typetoken =>{
      if(typetoken.results.permission == "Admin"){
        this.tokenType = typetoken
      }
    })
  }

  /**
   * Método lanzado para eliminar token y cerrar sesión que redirecciona a home.
   */
  logout(){
    this.router.navigate(['home']).then(() => {
      this.cookieService.delete('Token');
      this.cookieService.delete('idUser');
      window.location.reload();
    });
  }

}
