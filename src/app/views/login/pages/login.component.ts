import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { Route, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import Swal from 'sweetalert2';
/**
 * Clase que representa al inicio de sesión
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  /**
   * @constructor
   * @param {FormBuilder} fb : Creador de formulario
   * @param {Router} router :  Navegador de rutas
   * @param {LoginService} loginService : Servicio de inicion de sesión
   */
  constructor(fb: FormBuilder, private router: Router, private loginService: LoginService, private cookieService: CookieService) {
    this.loginForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }
  /**
   * @override
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
  /**
   * Método lanzado al dar clic en el botón para iniciar sesión
   */
  onSubmit() {
    var request = this.loginForm.value;
    this.loginService.login_auth(request['email'], request['password']).subscribe(data =>{
      if(data.code == 404){
        Swal.fire("ERROR", "Usuario no encontrado", 'error').then(()=>{
          this.router.navigate(['login']).then(() => {
            window.location.reload();
          });
        })
      }else{
        this.loginService.type_auth(data.results.token).subscribe(user =>{
          this.cookieService.set('idUser', user.results.id);
        })
          this.cookieService.set('Token', data.results.token);
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
      }
    })
  }
}
