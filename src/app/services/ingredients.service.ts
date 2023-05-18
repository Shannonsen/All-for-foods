import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Clase que representa el servicio para los ingredientes.
 */
@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  /**
   * @constructor
   * @param {HttpClient} http: Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método que obtiene todos los ingredientes sin paginar.
   * @returns {Observable<any>} Lista de ingredientes.
   */
  public getAllIngredients(): Observable<any> {
    const params = new HttpParams()
      .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/ingredient/", { 'params': params });
  }

  /**
   * Método para obtener todos los ingredientes paginados.
   * @param {string} token : token de acceso.
   * @param {number} page : página actual para obtener lista de ingredientes.
   * @returns {Observable<any>} Lista de ingredientes.
   */
  public getAllIngredientsActivated(token: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.get('http://localhost:3001/api/v1/ingredient/', { 'headers': headers, 'params': params });
  }

  /**
   * Método para añadir un nuevo ingrediente.
   * @param {string} token : token de accesso.
   * @param {string} name : nombre del ingrediente.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor y el nuevo ingrediente.
   */
  public addIngredient(token: string, name: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.post("http://localhost:3001/api/v1/ingredient/", { 'name': name }, { 'headers': headers });
  }

  /**
   * Método para eliminar un ingrediente.
   * @param {string} token : token de accesso.
   * @param {number} idIngredient : id del ingrediente.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public deleteIngredient(token: string, idIngredient: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.delete("http://localhost:3001/api/v1/ingredient/" + idIngredient, { headers: headers });
  }

}
