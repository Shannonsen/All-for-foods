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

  private LOCAL_SUCCESS = 'http://localhost:4200/assets/success_post.json';
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para el registro local de un usuario
   * 
   * @returns {Observable<ay>} Lista de usuarios
   */
  public registerUser(): Observable<any>{
    return this.http.get(this.LOCAL_SUCCESS);
  }

  /**
   * Método que crea un usuario en la DB
   * @param body : La información del usuario
   * @returns El usuario creado
   */
  public postUser(body: any): Observable<any>{
    return this.http.post("http://localhost:3001/api/v1/user/", body);
  }
}
