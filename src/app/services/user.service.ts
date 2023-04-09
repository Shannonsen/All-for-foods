import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private LOCAL_USERS = "http://localhost:4200/assets/users.json"

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get(this.LOCAL_USERS);
  }


}
