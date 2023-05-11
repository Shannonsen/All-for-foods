import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../views/shared/models/user.model';
/**
 * Clase que representa el servicio de usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private LOCAL_USERS = "http://localhost:4200/assets/users.json"
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http
   */
  constructor(private http: HttpClient) { }

  public getAllUsersActivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/user/admin/getAll/1', {'headers': headers, 'params': params});
  }


  public deleteUser(idRecipe: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/user/delete/" + idRecipe, null,  {'headers': headers});
  }

  public activeUser(idRecipe: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/user/reactivate/" + idRecipe, null,  {'headers': headers});
  }


  /**
   * Método para la obtención de todos los clientes
   * @returns
   */
  public getAllUsers(): Observable<any> {
    return this.http.get(this.LOCAL_USERS);
  }
  /**
   * Método para obtener la información de un usuario por su id
   * @param {number} id : Identificador único del usuario
   * @returns {Observable<User>} Regrese el usuario encontrado
   */
  public getUserById(id: number): Observable<User | undefined>{
    return this.http.get<User[]>(this.LOCAL_USERS).pipe(
      map(users => users.find(user => user.id === id)),
      catchError(error => {
        console.error(error);
        return throwError('no recipe by that id found');
      })
    );
  }

  public getUserId(id: number): Observable<any>{
    return this.http.get<User>("http://localhost:3001/api/v1/user/"+ id);
  }
}

