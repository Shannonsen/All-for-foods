import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
/**
 * Clase que representa el middleware de autorización para permitir editar una receta (view recipe), la cual solo puede ser editada por el usuario que la creo.
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeAuthGuard implements CanActivate {

  /**
   * @constructor
   * @param {CookieService} cookieService : Servicio de cookies.
   * @param {Router} router : Navegación entre rutas.
   * @param {RecipesService} recipesService : Servicio de recetas.
   */
  constructor(private cookieService: CookieService, private recipesService: RecipesService, private router: Router) { }

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
    var userId = this.cookieService.get('idUser');
    if (token) {
      return new Promise<boolean>((resolve) => {
        this.recipesService.getRecipeById(route.params['id']).subscribe(recipe => {
          if (recipe.results.user.id == userId) {
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
