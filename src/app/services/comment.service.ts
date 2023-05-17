import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../views/shared/models/comment.model';

/**
 * Clase que representa el servicio para comentarios.
 */

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private LOCAL_COMMENTS = "http://localhost:4200/assets/comments.json";

/**
 * @constructor
 * @param {HttpClient} http : Cliente http
 */
  constructor(private http: HttpClient) { }

/**
  * Método para obtener los comentarios
  * @returns {Observable<any>} Lista de comentarios
  */

  public getAllComments(): Observable<any>{
    return this.http.get(this.LOCAL_COMMENTS);
  }

  /**
   * Método que obtiene todos los comentarios en una receta específica
   * 
   * @param idRecipe : el id de la receta
   * @param page : el número de página para la paginación (default 1)
   * @returns {Observable<any>} : Lista de comentarios para la receta específica
   */
  public getAllCommentsSpecificRecipe(idRecipe:number, page: number=1): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    return this.http.get("http://localhost:3001/api/v1/comment/" + idRecipe, {'params': params})
  }

/**
  * Método para añadir comentarios
  * @param recipeID : el id de la receta
  * @param userId : el id del usuario al que pertenece el comentario
  * @param comment : el comentario
  * @param token : el token del usuario
  * @returns {Observable<any>} Lista de comentarios
  */
  postComment(recipeID:number, userId: number, comment: string, token:string): Observable<any> {
    let body = {
      "recipeId": recipeID ,
      "userId": userId,
      "comment": comment
    }
    const headers = new HttpHeaders({'authorization': token})
    return this.http.post("http://localhost:3001/api/v1/comment/",body, {'headers':headers})
  }

  /**
   * Método que elimina un comentario por su id
   * 
   * @param idComment : el id del comentario a eliminar
   * @param token : el token de autorización para autenticación
   * @returns {Observable<any>} El resultado de la eliminación
   */
  deleteComment(idComment: number, token:string): Observable<any> {
    const headers = new HttpHeaders({'authorization': token})
    return this.http.delete("http://localhost:3001/api/v1/comment/" + idComment, {'headers':headers})
  }
}
