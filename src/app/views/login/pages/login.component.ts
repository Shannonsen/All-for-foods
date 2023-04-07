import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    var request = this.loginForm.value;
    this.loginService.login().subscribe(users => {
      console.log(users);
      var user = (users as User[]).find(p => p.email == request['email'] && p.password == request['password'])
      if (user) {
        alert("Sesión iniciada\nToken: " + user.token);
        this.router.navigate(['home']);
      } else {
        alert("Usuario o contraseña incorrecta");
      }
    });
  }

}
