import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Clase que representa el servicio para los ingredientes.
 */
@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private LOCAL_INGREDIENTS = "http://localhost:4200/assets/ingredients.json"

  /**
   * @constructor
   * @param {HttpClient} http: Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método que obtiene todos los ingredientes
   * @returns {Observable<any>} Lista de ingredientes
   */
  public getAllIngredients(): Observable<any>{
    return this.http.get(this.LOCAL_INGREDIENTS);
  }


  public getAllIngredientsActivated(token:string, page: number): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/ingredient/', {'headers': headers, 'params': params});
  }

  public addIngredient(token: string, name: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/ingredient/", {'name': name},  {'headers': headers});
  }

  public deleteIngredient(token: string, id: number): Observable<any>{
    const headers = new HttpHeaders({'Authorization': token});
    return this.http.delete("http://localhost:3001/api/v1/ingredient/" + id, {headers: headers});
  }
}
