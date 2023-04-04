import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private LOCAL_FOODS = "http://localhost:4200/assets/foods.json"

  constructor(private http: HttpClient) { }

  public getAllFoods(): Observable<any>{
    return this.http.get(this.LOCAL_FOODS);
  }

}
