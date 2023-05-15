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
   * @returns {Observable<any>} La lista de todas las recetas.
   */
  public getAllFoods(page: number = 1 , size:number = 4): Observable<any> {
    const params = new HttpParams()
  .set('page', page)
  .set('size', size);
    return this.http.get("http://localhost:3001/api/v1/recipe/",{params});
  }

  public getAllRecipesActivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/recipe/admin/getAll/1', {'headers': headers, 'params': params});
  }

  public getAllRecipesDesactivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/recipe/admin/getAll/0', {'headers': headers, 'params': params});
  }

  public getAllFollowsRecipes(id:number, page: number = 1): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/recipe/myFollows/" + id, {'params': params})
  }

  public deleteRecipe(idRecipe: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/recipe/delete/" + idRecipe, null,  {'headers': headers});
  }

  public activeRecipe(idRecipe: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/recipe/reactivate/" + idRecipe, null,  {'headers': headers});
  }

  public getMyFavoritesRecipes(id:number, page: number): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/favorite/" + id, {'params': params})
  }

  public getAllMyFavoritesRecipes(id: number): Observable<any>{
    const params = new HttpParams()
    .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/favorite/" + id, {'params': params})
  }

  public getMyRecipes(id: number, page:number): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/recipe/my/" + id, {'params': params})
  }

  /**
   * Método que devuelve la información de una receta por su id.
   * @param {number} id : Identificador único de la receta.
   * @returns {Observable <Food | undefined>} : Regresa la receta encontrada que corresponde al id.
   */
  public getRecipeById(id: number): Observable<any> {
    return this.http.get<Food>("http://localhost:3001/api/v1/recipe/"+ id);
  }

  public putRecipeById(id: number, token: string, body: any): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/recipe/" + id, body , {'headers': headers})
  }

  public postRecipe(token: string, body: any): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/recipe", body, {'headers': headers})
  }

  public isFavorite(recipeId: number[], userId: number, token: string): Observable<any>{
    let body ={
      "userId": userId,
      "recipeIds": recipeId,
    }
    const headers = new HttpHeaders({'authorization': token})
    return this.http.post("http://localhost:3001/api/v1/favorite/byRecipesIds", body, {'headers': headers})
  }

  public deleteFavorite(recipeId: number, userId: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token})
    return this.http.delete("http://localhost:3001/api/v1/favorite/" + userId + "/" + recipeId, {'headers': headers})
  }

  public postFavorite(recipeId: number, userId: number, token: string): Observable<any>{
    let body ={
      "userId": userId,
      "recipeId": recipeId,
    }
    const headers = new HttpHeaders({'authorization': token})
    return this.http.post("http://localhost:3001/api/v1/favorite/", body, {'headers': headers})
  }

  public getMyScore(token: string, idUser: number, idRecipe: number): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get("http://localhost:3001/api/v1/score/"+ idUser +"/" + idRecipe, {'headers': headers})
  }

  public deleteMyScore(token: string,idUser: number, idRecipe: number ):Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.delete("http://localhost:3001/api/v1/score/" + idUser + "/" + idRecipe,  {'headers': headers})

  }

  public postMyScore(token: string,idUser: number, idRecipe: number, score: number):Observable<any>{
    let body ={
      "userId": idUser,
      "recipeId": idRecipe,
      'score': score
    }
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/score/", body, {'headers': headers})
  }

  public searchByTitleRecipes(title: string, page: number=1){
    const params = new HttpParams()
    .set('page', page)
    let body ={
      "title": title,
    }
    return this.http.post("http://localhost:3001/api/v1/recipe/title", body, {'params':params})
  }

  public searchByIngredientsRecipes(ingredients: number[], page: number=1){
    const params = new HttpParams()
    .set('page', page)
    let body ={
      "ingredients": ingredients,
    }
    return this.http.post("http://localhost:3001/api/v1/recipe/ingredients", body, {'params':params})
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

  /**
   * Método que recibe una receta nueva y la guarda en la base de datos.
   * @param {Food} recipe : La nueva receta a crearse y almacenarse.
   */
  public addRecipe(recipe: Food) {
    //add logic
  }

  /**
   * Método que recibe una receta ya existente y la guarda en la base de datos.
   * @param {Food} recipe : La receta editada a almacenarse.
   */
  public updateRecipe(recipe: Food) {
    //add logic
  }

}
