import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Food } from '../views/shared/models/food.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private LOCAL_FOODS = "http://localhost:4200/assets/foods.json"

  constructor(private http: HttpClient) { }

  public getAllFoods(): Observable<any> {
    return this.http.get(this.LOCAL_FOODS);
  }

  public getRecipeById(id: number): Observable<Food | undefined> {
    return this.http.get<Food[]>(this.LOCAL_FOODS).pipe(
      map(foods => foods.find(food => food.id === id)),
      catchError(error => {
        console.error(error);
        return throwError('no recipe by that id found');
      })
    );
  }

  public getRecipeByAuthor(author: string): Observable<Food | undefined> {
    return this.http.get<Food[]>(this.LOCAL_FOODS).pipe(
      map(foods => foods.find(food => food.author === author)),
      catchError(error => {
        console.error(error);
        return throwError('no recipe by that id found');
      })
    );
  }

  public getFoodCount(): Observable<number> {
    return this.http.get<any[]>(this.LOCAL_FOODS)
      .pipe(
        map(recipes => recipes.length)
      );
  }
  
  public addRecipe(recipe: Food) {
    //add logic
  }

  public updateRecipe(recipe: Food) {
    //add logic
  }

}
