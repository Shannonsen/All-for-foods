import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Clase que representa el servicio para comentarios.
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  /**
   * @constructor
   * @param {HttpClient} http : Cliente http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para obtener todos los comentarios de una receta especifica.
   * @param {number} idRecipe : id de la receta.
   * @param {number} page : página actual para obtener lista de comentarios.
   * @returns {Observable<any>} Respuesta que incluye lista de comentarios paginados.
   */
  public getAllCommentsSpecificRecipe(idRecipe: number, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/comment/" + idRecipe, { 'params': params })
  }

  /**
   * Método para añadir un nuevo comentario.
   * @param  {number} idRecipe : id de la receta donde se agregará el comentario.
   * @param  {number} idUser : id del usuario que agrego la receta.
   * @param  {string} comment : comentario.
   * @param  {string} token : token de acceso.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  postComment(idRecipe: number, idUser: number, comment: string, token: string): Observable<any> {
    let body = {
      "recipeId": idRecipe,
      "userId": idUser,
      "comment": comment
    }
    const headers = new HttpHeaders({ 'authorization': token })
    return this.http.post("http://localhost:3001/api/v1/comment/", body, { 'headers': headers })
  }

  /**
   * Método para eliminar un comentario existente.
   * @param {number} idComment: id del comentario a eliminar.
   * @param {string} token: token de accesso.
   * @returns {Observable<any>} Respuesta que incluye el codigo de respuesta del servidor.
   */
  deleteComment(idComment: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'authorization': token })
    return this.http.delete("http://localhost:3001/api/v1/comment/" + idComment, { 'headers': headers })
  }
}
