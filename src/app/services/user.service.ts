import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../views/shared/models/user.model';
/**
 * Clase que representa el servicio de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para obtener todos los usuarios activos.
   * @param {string} token : token de acceso.
   * @param {number} page : página actual del paginado.
   * @returns {Observable<any>} : Listado de todos los usuarios activos paginados.
   */
  public getAllUsersActivated(token: string, page: number = 2): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.get('http://localhost:3001/api/v1/user/admin/getAll/1', { 'headers': headers, 'params': params });
  }

  /**
 * Método para obtener todos los usuarios desactivados.
 * @param {string} token : token de acceso.
 * @param {number} page : página actual del paginado.
 * @returns {Observable<any>} : Listado de todos los usuarios desactivados paginados.
 */
  public getAllUsersDesactivated(token: string, page: number = 2): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.get('http://localhost:3001/api/v1/user/admin/getAll/0', { 'headers': headers, 'params': params });
  }

  /**
   * Método para eliminar - desactivar un usuario.
   * @param {number} idUser : id de usuario.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public deleteUser(idUser: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.put("http://localhost:3001/api/v1/user/delete/" + idUser, null, { 'headers': headers });
  }

  /**
   * Método para activar un usuario.
   * @param {number} idUser : id de usuario.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public activeUser(idUser: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.put("http://localhost:3001/api/v1/user/reactive/" + idUser, null, { 'headers': headers });
  }

  /**
   * Método para obtener la información de un usuario por su id.
   * @param {number | undefined} idUser : id del usuario.
   * @returns {Observable<User>} Usuario que coincide con el id proporcionado.
   */
  public getUserById(idUser: number | undefined): Observable<any> {
    return this.http.get("http://localhost:3001/api/v1/user/" + idUser)
  }

  /**
   * Método para editar un usuario.
   * @param {number} idUser : id del usuario.
   * @param {string} token : token de acceso.
   * @param {any} body : parametros que serán modificados al usuario.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public putUserById(idUser: number, token: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.put('http://localhost:3001/api/v1/user/' + idUser, body, { 'headers': headers })
  }

  /**
   * Método para crear relacion de un usuario siguiendo a otro. (seguir a un usuario).
   * @param {number} idUser : id del usuario quien va a seguir a otro usuario.
   * @param {number} idFollow : id usuario seguido.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public postFollow(idUser: number, idFollow: number, token: string): Observable<any> {
    let body = {
      "userId": idUser,
      "followId": idFollow,
    }
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.post("http://localhost:3001/api/v1/follow", body, { 'headers': headers })
  }

  /**
   * Método para eliminar la relacion de un usuario siguiendo a otro. (dejar de seguir un usuario).
   * @param {number} idUser : id del usuario quien va a seguir a otro usuario.
   * @param {number} idFollow : id usuario seguido.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  public deleteFollow(idUser: number, idFollow: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.delete("http://localhost:3001/api/v1/follow/" + idUser + "/" + idFollow, { 'headers': headers })
  }

  /**
   * Método para verificar si un usuario sigue a otros usuarios.
   * @param {number} idUser : id del usuario.
   * @param {number[]} idFollow : id de los posibles seguidores.
   * @param {string} token : token de acceso.
   * @returns {Observable<any>} : Listado de los seguidores con atributo true si el usuario lo sigue o false si no lo sigue.
   */
  public isFollowing(idUser: number, idFollow: number[], token: string): Observable<any> {
    let body = {
      "userId": idUser,
      "userIds": idFollow,
    }
    const headers = new HttpHeaders({ 'authorization': token });
    return this.http.post("http://localhost:3001/api/v1/follow/byUserIds", body, { 'headers': headers })
  }

  /**
   * Método para obtener todos los seguidores que sigue un usuario.
   * @param {number} idUser : id del usuario.
   * @returns {Observable<any>} Listado de seguidores sin paginado.
   */
  public getFollowings(idUser: number): Observable<any> {
    const params = new HttpParams()
      .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/follow/getFollowings/" + idUser, { 'params': params })
  }

}

