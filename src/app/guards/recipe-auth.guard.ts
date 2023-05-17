import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeAuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private recipesService: RecipesService, private router: Router){

  }
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
            }else{
              this.router.navigate(['notfound/']);
            }
          })
        })
      }else{
        return this.router.navigate(['notfound/']);
      }
  }

}
