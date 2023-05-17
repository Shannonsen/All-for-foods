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
    const params = new HttpParams()
    .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/ingredient/", {'params': params});
  }

  /**
   * Método que devuelve los ingredientes activos
   * 
   * @param token : El token de autorización para autenticación
   * @param page : El número de páginas para la paginación
   * @returns {Observable<any>} Los ingredientes activos
   */
  public getAllIngredientsActivated(token:string, page: number): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/ingredient/', {'headers': headers, 'params': params});
  }

  /**
   * Método que agrega un nuevo ingrediente a la DB
   * 
   * @param token : El token de autorización para autenticación
   * @param name : El nombre del ingrediente
   * @returns {Observable<any>} El resultado de la adición
   */
  public addIngredient(token: string, name: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/ingredient/", {'name': name},  {'headers': headers});
  }

  /**
   * Método que elimina un ingrediente de acuerdo a su Id
   * @param token : El token de autorización para autenticación
   * @param id : El id del ingrediente a eliminar
   * @returns {Observable<any>} El resultado de la eliminación
   */
  public deleteIngredient(token: string, id: number): Observable<any>{
    const headers = new HttpHeaders({'Authorization': token});
    return this.http.delete("http://localhost:3001/api/v1/ingredient/" + id, {headers: headers});
  }
}
