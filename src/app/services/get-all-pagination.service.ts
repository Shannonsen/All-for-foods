import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IngredientsService } from './ingredients.service';
import { CommentService } from './comment.service';

/**
 * Clase que representa el servicio de paginación.
 */
@Injectable({
  providedIn: 'root'
})
export class GetAllPaginationService {

  /**
   * @constructor
   * @param http : Cliente http
   * @param recipeService : Servicio de recetas
   * @param userService : Servicio de usuarios
   * @param ingredientService : Servicio de ingredientes
   * @param commentService : Servicio de comentarios
   */
  constructor(private http: HttpClient, private recipeService: RecipesService, private userService: UserService, private ingredientService: IngredientsService, private commentService: CommentService) { }

  /**
   * Obtiene información de diferentes servicios basados en un tipo de búsqueda
   * @param {string} typeSearch : El tipo de búsqueda a realizar
   * @param {number} page : El número de páginas para la paginación
   * @param {number} size : El tamaño de items por página (4 por default)
   * @param {string} token : El token de autorización para autenticación
   * @param {number} idUser : El id del usuario (si aplica)
   * @param {number} idRecipe : El id de la receta (si aplica)
   * @param {string} title : El título de la receta (si aplica)
   * @param {number[]} ingredients : Array de ids de ingredientes (si aplica)
   * @returns {Observable<any>} Información basada en la búsqueda
   */
  public getServiceRecipes(typeSearch:string ="", page:number, size:number = 4, token:string = "", idUser:number , idRecipe: number, title: string, ingredients: number[]): Observable<any>{
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
      case 'title-search':
        return this.recipeService.searchByTitleRecipes(title, page)
      case 'ingredient-search':
        return this.recipeService.searchByIngredientsRecipes(ingredients, page)
      default:
        return this.recipeService.getAllFoods(page)
    }
  }
}
