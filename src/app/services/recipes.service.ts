import { HttpClient } from '@angular/common/http';
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
  public getAllFoods(): Observable<any> {
    return this.http.get(this.LOCAL_FOODS);
  }

  /**
   * Método que devuelve la información de una receta por su id.
   * @param {number} id : Identificador único de la receta.
   * @returns {Observable <Food | undefined>} : Regresa la receta encontrada que corresponde al id.
   */
  public getRecipeById(id: number): Observable<Food | undefined> {
    return this.http.get<Food[]>(this.LOCAL_FOODS).pipe(
      map(foods => foods.find(food => food.id === id)),
      catchError(error => {
        console.error(error);
        return throwError('no recipe by that id found');
      })
    );
  }

  /**
   * Método que devuelve las recetas atribuidas al id de un autor.
   * @param {number} author : Identificador del autor.
   * @returns {Observable<Food | undefined>} : Regresa las recetas encontradas que corresponde al id del autor.
   */
  public getRecipeByAuthor(author: number): Observable<Food | undefined> {
    return this.http.get<Food[]>(this.LOCAL_FOODS).pipe(
      map(foods => foods.find(food => food.author === author)),
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
