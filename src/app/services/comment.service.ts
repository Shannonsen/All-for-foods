import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../views/shared/models/comment.model'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private LOCAL_COMMENTS = "http://localhost:4200/assets/foods.json"; 

  constructor(private http: HttpClient) { }

  getCommentsByRecipeId(recipeId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.LOCAL_COMMENTS}/comments`).pipe(
      map(comments => comments.filter(comment => comment.recipeId === recipeId))
    );
  }
  

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.LOCAL_COMMENTS}/comments`, comment);
  }
  
}
