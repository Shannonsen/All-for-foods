import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/**
 * Clase que representa el servicio de inicio de sesión.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para autentificar al usuario que se esta logueando.
   * @param {string} email : Email del usuario
   * @param  {string} password : Contraseña del usuario.
   * @returns {Observable<any>} Token de acceso.
   */
  public loginAuth(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3001/api/v1/auth', { email: email, password: password })
  }

  /**
   * Método para verificar el tipo de token de acceso.
   * @param {string} token : Token de acceso.
  * @returns {Observable<any>} Tipo de usuario, admin o usuario normal (foodie).
   */
  public typeAuth(token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.post('http://localhost:3001/api/v1/auth/getInfo', null, { 'headers': headers });
  }
}
