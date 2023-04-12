import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/**
 * Clase que representa el servicio de inicio de sesión
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOCAL_USERS = "http://localhost:4200/assets/users.json"
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http 
   */
  constructor(private http: HttpClient) { }
  /**
   * Método para el inicio de sesión
   * @returns {Observable<any>} Lista de usuarios
   */
  public login(): Observable<any>{
    return this.http.get(this.LOCAL_USERS);
  }
}
