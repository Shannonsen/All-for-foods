import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IngredientsService } from './ingredients.service';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllPaginationService {
  constructor(private http: HttpClient, private recipeService: RecipesService, private userService: UserService, private ingredientService: IngredientsService, private commentService: CommentService) { }

  public getServiceRecipes(typeSearch:string ="", page:number, size:number = 4, token:string = "", idUser:number , idRecipe: number): Observable<any>{
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
      case 'my-recipes':
        return this.recipeService.getMyRecipes(idUser, page)
      case 'follow-recipes':
        return this.recipeService.getAllFollowsRecipes(idUser, page)
      case 'comments-recipe':
        return this.commentService.getAllCommentsSpecificRecipe(idRecipe, page)
      default:
        return this.recipeService.getAllFoods(page)
    }
  }
}
