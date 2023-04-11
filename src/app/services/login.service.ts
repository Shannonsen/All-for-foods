import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../views/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOCAL_USERS = "http://localhost:4200/assets/users.json"

  private userModel: User[] = [];

  constructor(private http: HttpClient) { }

  public login(): Observable<any>{
    return this.http.get(this.LOCAL_USERS);
  }
}
