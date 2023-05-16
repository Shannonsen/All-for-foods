import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Clase que representa el servicio para emails.
 */
@Injectable({
  providedIn: 'root'
})
export class EmailService {

/**
 * @constructor
 * @param {HttpClient} http : Cliente http
 */
  constructor(private http: HttpClient) { }

  /**
   * Método para enviar email.
   * @param {any} form : form email
   */
  public sendEmail(subject:string, message: string, name: string, emailFrom: string): Observable<any>{
    let body ={
      "subject": subject,
      "message": message,
      "name": name,
      "from": emailFrom
    }
    return this.http.post("http://localhost:3001/api/v1/email/toService", body)
  }

}
