import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../views/shared/models/comment.model'; 
import { map } from 'rxjs/operators';

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
  * Método para añadir comentarios
  * @returns {Observable<Comment>} Lista de comentarios
  */

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.LOCAL_COMMENTS}/comments`, comment);
  }
  
}
