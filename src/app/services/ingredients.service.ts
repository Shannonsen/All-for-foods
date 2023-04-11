import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private LOCAL_INGREDIENTS = "http://localhost:4200/assets/ingredients.json"

  constructor(private http: HttpClient) { }

  public getAllIngredients(): Observable<any>{
    return this.http.get(this.LOCAL_INGREDIENTS);
  }
}
