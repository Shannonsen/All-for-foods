import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private LOCAL_SUCCESS = 'http://localhost:4200/assets/success_post.json';

  constructor(private http: HttpClient) { }

  public registerUser(): Observable<any>{
    return this.http.get(this.LOCAL_SUCCESS);
  }
}
