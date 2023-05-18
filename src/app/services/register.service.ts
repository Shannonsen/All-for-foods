import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Clase que representa el servicio de registro
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para agregar un usuario.
   * @param {any} body : parametros que serán agregados al usuario.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public postUser(body: any): Observable<any>{
    return this.http.post("http://localhost:3001/api/v1/user/", body);
  }
}
