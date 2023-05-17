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

  /**
   * Método que obtiene a todos los usuarios activos
   * 
   * @param token : El token de autorización para autenticación
   * @param page : El número de página para la paginación (default 2)
   * @returns Lista de los usuarios activos
   */
  public getAllUsersActivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/user/admin/getAll/1', {'headers': headers, 'params': params});
  }

  /**
   * Método que obtiene a todos los usuarios desactivados
   * 
   * @param token : El token de autorización para autenticación
   * @param page : El número de página para la paginación (default 2)
   * @returns Lista de los usuarios desactivados
   */
  public getAllUsersDesactivated(token: string, page:number = 2): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    const headers = new HttpHeaders({'authorization': token});
    return this.http.get('http://localhost:3001/api/v1/user/admin/getAll/0', {'headers': headers, 'params': params});
  }

  /**
   * Método que elimina (desactiva) un usuario con base en su id
   * 
   * @param idUser : el id del usuario a desactivar
   * @param token : El token de autorización para autenticación
   * @returns El resultado de la desactivación
   */
  public deleteUser(idUser: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/user/delete/" + idUser, null,  {'headers': headers});
  }

  /**
   * Método que reactiva a un usuario con base en su id
   * 
   * @param idUser : el id del usuario a reactivar
   * @param token : El token de autorización para autenticación
   * @returns El resultado de la reactivación
   */
  public activeUser(idUser: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put("http://localhost:3001/api/v1/user/reactive/" + idUser, null,  {'headers': headers});
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
   * 
   * @param {number} id : Identificador único del usuario
   * @returns {Observable<User>} Regresa el usuario encontrado
   */
  public getUserById(id: number | undefined): Observable<any>{
    return this.http.get("http://localhost:3001/api/v1/user/" + id)
  }

  /**
   * Método para acutalizar la información de un usuario por su id
   * 
   * @param {number} id : Identificador único del usuario
   * @param token : El token de autorización para autenticación
   * @param body : La información a actualizar del usuario
   * @returns {Observable<any>} Regresa el usuario actualizado
   */
  public putUserById(id: number, token:string, body: any): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.put('http://localhost:3001/api/v1/user/' + id, body, { 'headers': headers})
  }

  /**
   * Método que obtiene la información del usuario por su id
   * @deprecated Usar getUserById
   * @param id : El id del usuario
   * @returns  Regresa el usuario encontrado
   */
  public getUserId(id: number): Observable<any>{
    return this.http.get<User>("http://localhost:3001/api/v1/user/"+ id);
  }

  /**
   * Método que crea una nueva relación entre dos usuarios
   * 
   * @param idUser : El id del usuario
   * @param idFollow : El id del usuario a seguir
   * @param token : El token de autorización para autenticación
   * @returns La relación de follow creada
   */
  public postFollow(idUser: number, idFollow: number, token: string): Observable<any>{
    let body ={
      "userId": idUser,
      "followId": idFollow,
    }
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/follow", body, {'headers': headers})
  }

  /**
   * Método que elimina la relación follow entre dos usuarios
   * 
   * @param idUser : El id del usuario seguidor
   * @param idFollow : El id del usuario al que se sigue
   * @param token : El token de autorización para autenticación
   * @returns El resultado de la eliminación de la relación
   */
  public deleteFollow(idUser: number, idFollow: number, token: string): Observable<any>{
    const headers = new HttpHeaders({'authorization': token});
    return this.http.delete("http://localhost:3001/api/v1/follow/" + idUser + "/" + idFollow, {'headers': headers})
  }

  /**
   * Método que revisa el el estado de la relación entre usuarios con base en su id
   * 
   * @param idUser : El id del usuario que sigue
   * @param idFollow : Array de ids de los usuarios a checar
   * @param token : El token de autorización para autenticación
   * @returns Un array con los resultados de la verificación
   */
  public isFollowing(idUser: number, idFollow: number[], token: string): Observable<any>{
    let body ={
      "userId": idUser,
      "userIds": idFollow,
    }
    const headers = new HttpHeaders({'authorization': token});
    return this.http.post("http://localhost:3001/api/v1/follow/byUserIds", body, {'headers': headers})
  }

  /**
   * Método que devuelve a todos los usuarios que siguen al usuario dado su id
   * 
   * @param idUser : Id del usuario al cual devolver sus seguidores
   * @returns La lista de los usuarios que siguien al dueño del idUser
   */
  public getFollowings(idUser: number): Observable<any>{
    const params = new HttpParams()
    .set('size', '*')
    return this.http.get("http://localhost:3001/api/v1/follow/getFollowings/" + idUser, {'params': params})
  }

}

