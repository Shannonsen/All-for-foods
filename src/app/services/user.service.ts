import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../views/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private LOCAL_USERS = "http://localhost:4200/assets/users.json"

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get(this.LOCAL_USERS);
  }

  public getUserById(id: number): Observable<User | undefined>{
    return this.http.get<User[]>(this.LOCAL_USERS).pipe(
      map(users => users.find(user => user.id === id)),
      catchError(error => {
        console.error(error);
        return throwError('no recipe by that id found');
      })
    );
  }
} 

