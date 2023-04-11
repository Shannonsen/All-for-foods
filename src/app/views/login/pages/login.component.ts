import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../shared/models/user.model';
import { Route, Router } from '@angular/router';
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
  constructor(fb: FormBuilder, private router: Router, private loginService: LoginService) {
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
    this.loginService.login().subscribe(users => {
      console.log(users);
      var user = (users as User[]).find(p => p.email == request['email'] && p.password == request['password'])
      if (user) {
        alert("Sesión iniciada\nToken: " + user.token);
        localStorage.setItem('Token', user.token);
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      } else {
        alert("Usuario o contraseña incorrecta");
      }
    });
  }

}
