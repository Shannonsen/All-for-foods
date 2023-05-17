import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

/**
 * Clase que representa el middleware de autorización para verificar que un usuario logueado es administrador.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  /**
   * @constructor
   * @param {CookieService} cookieService : Servicio de cookies.
   * @param {Router} router : Navegación entre rutas.
   * @param {LoginService} loginService : Servicio de login.
   */
  constructor(private cookieService: CookieService, private router: Router, private loginService: LoginService) { }

  /**
   * Metodo que sirve para permitir o no permitir acceso a una ruta.
   * @param {ActivatedRouteSnapshot} route : Parametro que contiene información sobre los parámetros, datos estáticos y otras propiedades relacionadas con la ruta.
   * @param {RouterStateSnapshot} state : Parametro que proporciona información sobre la URL actual, los parámetros de ruta, los datos de la ruta y otros detalles relevantes.
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = this.cookieService.get('Token');
    if (token) {
      return new Promise<boolean>((resolve) => {
        this.loginService.type_auth(token).subscribe(token => {
          if (token.code == 200 && token.results.permission == "Admin") {
            resolve(true)
          } else {
            this.router.navigate(['notfound/']);
          }
        })
      })
    } else {
      return this.router.navigate(['notfound/']);
    }
  }

}
