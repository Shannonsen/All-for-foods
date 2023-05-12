import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helper/mustmatch';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
/**
 * Clase que representa el registro de un usuario
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  /**
   * @constructor
   * @param {Router} router : Navegador de rutas
   * @param {FormBuilder} fb : Creador de formulario
   * @param {RegisterService} registerService : Servicio de registro
   */
  constructor(private router: Router, fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }
  /**
   * @override
   */
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.min(8)])
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }
  /**
   * Método lanzado al dar clic en el botón para registrarse
   */
  onSubmit() {
    var request = this.registerForm.value;
    var body: any =
    {
      "username": request['username'],
      "email": request['email'],
      "password": request['password'],
      "icon": "",
      "description": "",
    };

    this.registerService.postUser(body).subscribe(response => {
      if (response.code == 201) {
        Swal.fire("CORRECTO", 'Usuario creado', 'success').then(()=>{
          this.router.navigate(['login']);
        })
      } else {
        Swal.fire("ERROR", response.message, 'error').then(()=>{
          this.router.navigate(['register']);
        })
      }
    });
  }
}
