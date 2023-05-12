import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IngredientsService } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllPaginationService {
  constructor(private http: HttpClient, private recipeService: RecipesService, private userService: UserService, private ingredientService: IngredientsService) { }

  public getServiceRecipes(typeSearch:string ="", page:number, size:number = 4, token:string = "", idUser:number): Observable<any>{
    switch(typeSearch){
      case 'delete':
        return this.recipeService.getAllRecipesActivated(token, page)
      case 'active':
        return this.recipeService.getAllRecipesDesactivated(token,page)
      case 'delete-users':
        return this.userService.getAllUsersActivated(token,page)
      case 'active-users':
        return this.userService.getAllUsersDesactivated(token,page)
      case 'delete-ingredients':
        return this.ingredientService.getAllIngredientsActivated(token, page)
      case 'favorites':
        return this.recipeService.getMyFavoritesRecipes(idUser, page)
      default:
        return this.recipeService.getAllFoods(page)
    }
  }
}
