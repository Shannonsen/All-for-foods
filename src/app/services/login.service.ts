import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  public login_auth(email: string, password: string): Observable<any>{
    return this.http.post('http://localhost:3001/api/v1/auth', {email: email, password: password})
  }

  public type_auth(token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post('http://localhost:3001/api/v1/auth/getInfo', null, { 'headers': headers });
  }
}
