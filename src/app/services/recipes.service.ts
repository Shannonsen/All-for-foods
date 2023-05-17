import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
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

  private LOCAL_FOODS = "http://localhost:4200/assets/foods.json"

  /**
   * @constructor
   * @param http : Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método que obtiene todas las recetas.
   * 
   * @returns {Observable<any>} La lista de todas las recetas.
   */
  public getAllFoods(page: number = 1 , size:number = 4): Observable<any> {
    const params = new HttpParams()
  .set('page', page)
  .set('size', size);
    return this.http.get("http://localhost:3001/api/v1/recipe/",{params});
  }

  /**
   * Método que obtiene todas las recetas activas
   * 
   * @param token : El token de autorización para autenticación
   * @param page : El número de página para la paginación (default 2)
   * @returns {Observable<any>} Array de recetas activas
   */
  public getAllRecipesActivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/recipe/admin/getAll/1', {'headers': headers, 'params': params});
  }

  /**
   * Método que obtiene todas las recetas desactivadas
   * 
   * @param token : El token de autorización para autenticación
   * @param page : El número de página para la paginación (default 2)
   * @returns {Observable<any>} Array de recetas desactivadas
   */
  public getAllRecipesDesactivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/recipe/admin/getAll/0', {'headers': headers, 'params': params});
  }

  /**
   * Método que obtiene todas las recetas de los foodies que sigue el usuario
   * @param id : El id del usuario
   * @param page : El número de página para la paginación (default 1)
   * @returns {Observable<any>} Array de recetas de los foodies que sigue el usuario
   */
  public getAllFollowsRecipes(id:number, page: number = 1): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/recipe/myFollows/" + id, {'params': params})
  }

  /**
   * Método que elimina (desactiva) una receta con base en su id
   * 
   * @param idRecipe : El id de la receta a eliminar (desactivar)
   * @param token : El token de autorización para autenticación
   * @returns {Observable<any>} El resultado de la eliminación (desactivación)
   */
  public deleteRecipe(idRecipe: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/recipe/delete/" + idRecipe, null,  {'headers': headers});
  }

  /**
   * Método que reactiva una receta con base en su id
   * 
   * @param idRecipe : El id de la receta a reactivar
   * @param token : El token de autorización para autenticación
   * @returns {Observable<any>} El resultado de la reactivación
   */
  public activeRecipe(idRecipe: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/recipe/reactivate/" + idRecipe, null,  {'headers': headers});
  }

  /**
   * Método que obtiene las recetas favoritas de un usuario, paginadas
   * 
   * @param id : El id del usuario
   * @param page : El número de página para la paginación
   * @returns {Observable<any>} Array con las recetas favoritas del usuario
   */
  public getMyFavoritesRecipes(id:number, page: number): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/favorite/" + id, {'params': params})
  }

  /**
   * Método que obtiene todas las recetas favoritas de un usuario
   * 
   * @param id : El id del usuario
   * @returns {Observable<any>} Array con las recetas favoritas del usuario
   */
  public getAllMyFavoritesRecipes(id: number): Observable<any>{
    const params = new HttpParams()
    .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/favorite/" + id, {'params': params})
  }

  /**
   * Método que obtiene las recetas que le pertenecen a un usuario
   * @param id : El id del usuario
   * @param page : El número de página para la paginación
   * @returns {Observable<any>} Array con las recetas del usuario
   */
  public getMyRecipes(id: number, page:number): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/recipe/my/" + id, {'params': params})
  }

  /**
   * Método que devuelve la información de una receta por su id.
   * 
   * @param {number} id : Identificador único de la receta.
   * @returns {Observable<any>} : Regresa la receta encontrada que corresponde al id.
   */
  public getRecipeById(id: number): Observable<any> {
    return this.http.get<Food>("http://localhost:3001/api/v1/recipe/"+ id);
  }

  /**
   * Método que actualiza una receta con base en su id
   * 
   * @param id : El id de la receta
   * @param token : El token de autorización para autenticación
   * @param body : La información a actualizar de la receta
   * @returns {Observable<any>} El resultado de la actualización de la receta
   */
  public putRecipeById(id: number, token: string, body: any): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/recipe/" + id, body , {'headers': headers})
  }

  /**
   * Método que crea una receta
   * 
   * @param token : El token de autorización para autenticación
   * @param body : La información de la receta a crear
   * @returns {Observable<any>} El resultado de la creación de la receta
   */
  public postRecipe(token: string, body: any): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/recipe", body, {'headers': headers})
  }

  /**
   * Método que devuelve si las recetas especificadas son favoritas del usuario
   * 
   * @param recipeId : Array de ids de las recetas a checar
   * @param userId : El id del usuario
   * @param token : El token de autorización para autenticación
   * @returns {Observable<any>} El resultado de la comprobación
   */
  public isFavorite(recipeId: number[], userId: number, token: string): Observable<any>{
    let body ={
      "userId": userId,
      "recipeIds": recipeId,
    }
    const headers = new HttpHeaders({'authorization': token})
    return this.http.post("http://localhost:3001/api/v1/favorite/byRecipesIds", body, {'headers': headers})
  }

  /**
   * Método que elimina una receta de la lista de favoritos con base en su id
   * 
   * @param recipeId : El id de la receta a eliminar de favoritos
   * @param userId : El id del usuario
   * @param token : El token de autorización para autenticación
   * @returns {Observable<any>} El resultado de la eliminación
   */
  public deleteFavorite(recipeId: number, userId: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token})
    return this.http.delete("http://localhost:3001/api/v1/favorite/" + userId + "/" + recipeId, {'headers': headers})
  }

  /**
   * Método que agrega una receta a la lista de favoritos del usuario
   * 
   * @param recipeId : El id de la receta
   * @param userId : El id del usuario
   * @param token : El token de autorización para autenticación
   * @returns {Observable<any>} El resultado de la adición a favoritos del usuario
   */
  public postFavorite(recipeId: number, userId: number, token: string): Observable<any>{
    let body ={
      "userId": userId,
      "recipeId": recipeId,
    }
    const headers = new HttpHeaders({'authorization': token})
    return this.http.post("http://localhost:3001/api/v1/favorite/", body, {'headers': headers})
  }

  /**
   * Método que devuelve la calificación dada a una receta por un usuario
   * 
   * @param token : El token de autorización para autenticación
   * @param idUser : El id del usuario
   * @param idRecipe : El id de la receta
   * @returns {Observable<any>} La calificación de la receta dada por el usuario
   */
  public getMyScore(token: string, idUser: number, idRecipe: number): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get("http://localhost:3001/api/v1/score/"+ idUser +"/" + idRecipe, {'headers': headers})
  }

  /**
   * Método que elimina la calificación dada a una receta por un usuario
   * 
   * @param token : El token de autorización para autenticación
   * @param idUser : El id del usuario
   * @param idRecipe : El id de la receta
   * @returns {Observable<any>} El resultado de la eliminación
   */
  public deleteMyScore(token: string,idUser: number, idRecipe: number ):Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.delete("http://localhost:3001/api/v1/score/" + idUser + "/" + idRecipe,  {'headers': headers})

  }

  /**
   * Método que guarda la calificación dada a una receta por un usuario
   * 
   * @param token : El token de autorización para autenticación
   * @param idUser : El id del usuario
   * @param idRecipe : El id de la receta
   * @param score : La calificación a guardar
   * @returns {Observable<any>} El resultado de la calificación guardada
   */
  public postMyScore(token: string,idUser: number, idRecipe: number, score: number):Observable<any>{
    let body ={
      "userId": idUser,
      "recipeId": idRecipe,
      'score': score
    }
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/score/", body, {'headers': headers})
  }

  /**
   * Método que busca recetas por título
   * @param title : El título a buscar
   * @param page : El número de página para la paginación (default 1)
   * @returns El resultado de la búsqueda
   */
  public searchByTitleRecipes(title: string, page: number=1){
    const params = new HttpParams()
    .set('page', page)
    let body ={
      "title": title,
    }
    return this.http.post("http://localhost:3001/api/v1/recipe/title", body, {'params':params})
  }

  /**
   * Método que busca recetas por sus ingredientes
   * @param ingredients : Array de ingredientes por los cual buscar recetas
   * @param page : El número de página para la paginación (default 1)
   * @returns El resultado de la búsqueda
   */
  public searchByIngredientsRecipes(ingredients: number[], page: number=1){
    const params = new HttpParams()
    .set('page', page)
    let body ={
      "ingredients": ingredients,
    }
    return this.http.post("http://localhost:3001/api/v1/recipe/ingredients", body, {'params':params})
  }

  /**
   * Método que obtiene una receta al azar
   * @returns {Observable<any>} La receta encontrada al azar
   */
  public randomRecipe():Observable<any>{
    return this.http.get("http://localhost:3001/api/v1/recipe/search/random");
  }

  /**
   * Método que devuelve las recetas atribuidas al id de un autor.
   * @param {number} author : Identificador del autor.
   * @returns {Observable<Food | undefined>} : Regresa las recetas encontradas que corresponde al id del autor.
   */
  public getRecipeByAuthor(author: number): Observable<Food | undefined> {
    return this.http.get<Food[]>(this.LOCAL_FOODS).pipe(
      map(foods => foods.find(food => food.user.id === author)),
      catchError(error => {
        console.error(error);
        return throwError('no recipe by that id found');
      })
    );
  }

  /**
   * Método que devuelve la cantidad total de recetas existentes.
   * @returns {Observable<number>} : El valor del total de recetas.
   */
  public getFoodCount(): Observable<number> {
    return this.http.get<any[]>(this.LOCAL_FOODS)
      .pipe(
        map(recipes => recipes.length)
      );
  }
}
