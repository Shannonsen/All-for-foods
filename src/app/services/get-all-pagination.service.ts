import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IngredientsService } from './ingredients.service';
import { CommentService } from './comment.service';
/**
 * Clase que representa el servicio para los endpoints que utilizan la paginación.
 */
@Injectable({
  providedIn: 'root'
})
export class GetAllPaginationService {

  /**
   * @constructor
   * @param {RecipesService} recipeService : Servicio de recetas.
   * @param {UserService} userService : Servicio de usuario.
   * @param {IngredientsService} ingredientService : Servicio de ingredientes.
   * @param {CommentService} commentService : Servicio de comentarios.
   */
  constructor(private recipeService: RecipesService, private userService: UserService, private ingredientService: IngredientsService, private commentService: CommentService) { }

  /**
   * Método que sirve para obtener el listado que utilizará la paginación.
   * @param {string} typeSearch: tipo de busqueda para el tipo de listado.
   * @param {number} page : página actual para obtener el listado correspondiente al tipo de busqueda.
   * @param {string} token : token de acceso.
   * @param {number} idUser : id del usuario.
   * @param {number} idRecipe : id de receta.
   * @param {string} title : titulo para el caso del listado de busqueda por titulo.
   * @param {number[]} ingredients : id de ingredientes para el caso del listado de busqueda por ingrediente.
   * @returns { Observable<any> } Listado paginado correspondiente al tipo de busqueda para el componente de paginación.
   */
  public getServiceRecipes(typeSearch: string = "", page: number, token: string = "", idUser: number, idRecipe: number, title: string, ingredients: number[]): Observable<any> {
    switch (typeSearch) {
      case 'delete':
        return this.recipeService.getAllRecipesActivated(token, page)
      case 'active':
        return this.recipeService.getAllRecipesDesactivated(token, page)
      case 'delete-users':
        return this.userService.getAllUsersActivated(token, page)
      case 'active-users':
        return this.userService.getAllUsersDesactivated(token, page)
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
      case 'title-search':
        return this.recipeService.searchByTitleRecipes(title, page)
      case 'ingredient-search':
        return this.recipeService.searchByIngredientsRecipes(ingredients, page)
      default:
        return this.recipeService.getAllFoods(page)
    }
  }

}
