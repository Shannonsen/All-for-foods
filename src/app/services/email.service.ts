import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public SendEmail(form: any) {
    alert("Email enviado");
  }

}
