import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Food } from '../views/shared/models/food.model';
/**
 * Clase que representa el servicio de recetas.
 */
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  /**
   * @constructor
   * @param http : Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para obtener todas las recetas.
   * @param {number} page: página actual del paginado.
   * @param {number} size : tamaño del paginado, default 4.
   * @returns {Observable<any>} Listado de recetas paginado.
   */
  public getAllFoods(page: number = 1, size: number = 4): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get("http://localhost:3001/api/v1/recipe/", { params });
  }

  /**
   * Método para obtener listado de recetas activas.
   * @param {string} token : Token de acceso.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} Listado de recetas activas paginado.
   */
  public getAllRecipesActivated(token: string, page: number = 2): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.get('http://localhost:3001/api/v1/recipe/admin/getAll/1', { 'headers': headers, 'params': params });
  }

  /**
   * Método para obtener listado de recetas inactivas (desactivadas).
   * @param {string} token : Token de acceso.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} Listado de recetas inactivas paginado.
   */
  public getAllRecipesDesactivated(token: string, page: number = 2): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.get('http://localhost:3001/api/v1/recipe/admin/getAll/0', { 'headers': headers, 'params': params });
  }

  /**
   * Método para la obtencion de todas las recetas de quienes sigue (Followings) un usuario.
   * @param {number} idUser : id del usuario logueado.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} Listado de las recetas de los seguidores de un usuario paginado.
   */
  public getAllFollowsRecipes(idUser: number, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/recipe/myFollows/" + idUser, { 'params': params })
  }

  /**
   * Método para desactivar una receta activada.
   * @param {number} idRecipe : id de receta.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public deleteRecipe(idRecipe: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.put("http://localhost:3001/api/v1/recipe/delete/" + idRecipe, null, { 'headers': headers });
  }

  /**
   * Método para activar una receta desactivada.
   * @param {number} idRecipe : id de receta.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public activeRecipe(idRecipe: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.put("http://localhost:3001/api/v1/recipe/reactivate/" + idRecipe, null, { 'headers': headers });
  }

  /**
   * Método para obtener las recetas favoritas de un usuario paginado.
   * @param {number} idUser : id del usuario.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} Listado de recetas favoritas paginado.
   */
  public getMyFavoritesRecipes(idUser: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/favorite/" + idUser, { 'params': params })
  }

  /**
   * Método para obtener las recetas favoritas de un usuario sin paginar.
   * @param {number} idUser : id del usuario.
   * @returns {Observable<any>} Listado de recetas favoritas sin paginar.
   */
  public getAllMyFavoritesRecipes(idUser: number): Observable<any> {
    const params = new HttpParams()
      .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/favorite/" + idUser, { 'params': params })
  }

  /**
   * Método para obtener las recetas creadas por un usuario.
   * @param {number} idUser : id del usuario.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} Listado de recetas paginado.
   */
  public getMyRecipes(idUser: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/recipe/my/" + idUser, { 'params': params })
  }

  /**
   * Método que devuelve la información de una receta por su id.
   * @param {number} idRecipe : id de la receta.
   * @returns {Observable<any>} : receta que coincide con el id.
   */
  public getRecipeById(idRecipe: number): Observable<any> {
    return this.http.get<Food>("http://localhost:3001/api/v1/recipe/" + idRecipe);
  }

  /**
   * Método para la edición de una receta.
   * @param {number} idRecipe : id de la receta.
   * @param {string} token : token de acceso.
   * @param {any} body : body con los parametros que serán modificados de la receta.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public putRecipeById(idRecipe: number, token: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.put("http://localhost:3001/api/v1/recipe/" + idRecipe, body, { 'headers': headers })
  }

  /**
   * Método para crear una receta.
   * @param {string} token : token de acceso.
   * @param {any} body : body con los parametros que serán agregados a la.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public postRecipe(token: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.post("http://localhost:3001/api/v1/recipe", body, { 'headers': headers })
  }

  /**
   * Método para verificar si una receta es favorita para un usuario.
   * @param {number[]} recipeId : array de recetas a verificar.
   * @param {number} userId : id de usuario.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} : Listado de id de recetas con atributo true si es favorita o false si no lo es.
   */
  public isFavorite(recipeId: number[], userId: number, token: string): Observable<any> {
    let body = {
      "userId": userId,
      "recipeIds": recipeId,
    }
    const headers = new HttpHeaders({ 'authorization': token })
    return this.http.post("http://localhost:3001/api/v1/favorite/byRecipesIds", body, { 'headers': headers })
  }

  /**
   * Método para eliminar una relacion de receta favorita de un usuario.
   * @param {number} recipeId : id de receta.
   * @param {number} userId : id de usuario.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public deleteFavorite(recipeId: number, userId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token })
    return this.http.delete("http://localhost:3001/api/v1/favorite/" + userId + "/" + recipeId, { 'headers': headers })
  }

  /**
   * Método para agregar una relacion de receta favorita a usuario.
   * @param {number} recipeId : id de receta.
   * @param {number} userId : id de usuario.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public postFavorite(recipeId: number, userId: number, token: string): Observable<any> {
    let body = {
      "userId": userId,
      "recipeId": recipeId,
    }
    const headers = new HttpHeaders({ 'authorization': token })
    return this.http.post("http://localhost:3001/api/v1/favorite/", body, { 'headers': headers })
  }

  /**
   * Método para obtener el score que un usuario le ha dado a una receta.
   * @param {string} token : token de acceso.
   * @param {number} idUser : id de usuario.
   * @param {number} idRecipe : id de receta.
   * @returns {Observable<any>} : Score de un usuario.
   */
  public getMyScore(token: string, idUser: number, idRecipe: number): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.get("http://localhost:3001/api/v1/score/" + idUser + "/" + idRecipe, { 'headers': headers })
  }

  /**
   * Método para eliminar el score de un usuario.
   * @param {string} token : token de acceso.
   * @param {number} idUser : id de usuario.
   * @param {number} idRecipe : id de receta.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public deleteMyScore(token: string, idUser: number, idRecipe: number): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.delete("http://localhost:3001/api/v1/score/" + idUser + "/" + idRecipe, { 'headers': headers })

  }

  /**
   * Método para agregarle un score a un usuario.
   * @param {string} token : token de acceso.
   * @param {number} idUser : id de usuario.
   * @param {number} idRecipe : id de receta.
   * @param {number} score : calificación - score.
   * @returns {Observable<any>} : Respuesta que incluye el codigo de respuesta del servidor.
   */
  public postMyScore(token: string, idUser: number, idRecipe: number, score: number): Observable<any> {
    let body = {
      "userId": idUser,
      "recipeId": idRecipe,
      'score': score
    }
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.post("http://localhost:3001/api/v1/score/", body, { 'headers': headers })
  }

  /**
   * Método para buscar recetas por titulo.
   * @param {string} title : titulo de la receta.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} Listado de recetas que coinciden con el titulo paginado.
   */
  public searchByTitleRecipes(title: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    let body = {
      "title": title,
    }
    return this.http.post("http://localhost:3001/api/v1/recipe/title", body, { 'params': params })
  }

  /**
 * Método para buscar recetas por ingredientes.
 * @param {number[]} ingredients : array de los ingredientes.
 * @param {number} page : página actual del paginado.
 * @returns {Observable<any>} Listado de recetas que coinciden con los ingredientes paginado.
 */
  public searchByIngredientsRecipes(ingredients: number[], page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    let body = {
      "ingredients": ingredients,
    }
    return this.http.post("http://localhost:3001/api/v1/recipe/ingredients", body, { 'params': params })
  }

  /**
   * Método que devuelve una receta alazar.
   * @returns {Observable<any>} Receta aleatoria.
   */
  public randomRecipe(): Observable<any> {
    return this.http.get("http://localhost:3001/api/v1/recipe/search/random");
  }

}
