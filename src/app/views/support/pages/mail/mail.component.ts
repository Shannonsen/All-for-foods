import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';
/**
 * Clase que representa la página de soporte.
 */
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  FormData: FormGroup = new FormGroup('');

  /**
   * @constructor
   * @param {EmailService} contact: Servicio de email
   * @param {Router} router : Navegación de rutas
   */
  constructor(private contact: EmailService, private router: Router) {
  }

  /**
   * @override
   */
  ngOnInit(): void {
    this.FormData = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      email: new FormControl('', [Validators.required,Validators.minLength(4), Validators.email]),
      message: new FormControl('', [Validators.required,Validators.minLength(30)]),
      subject: new FormControl('', [Validators.required,Validators.minLength(4)])
    });
  }

  /**
   * Método encargado de llamar la funcion SendEmail para mandar el correo electronico
   */
  onSubmit() {
    var request = this.FormData.value;
    this.contact.sendEmail(request['subject'], request['message'], request['name'], request['email']).subscribe(response =>{
      if(response.code == 200){
        Swal.fire("CORRECTO", 'Correo enviado a soporte, favor de esperar unos 3 días hábiles', 'success').then(()=>{
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        })
      }else{
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['support']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

}
