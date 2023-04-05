import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    var request = this.loginForm.value;
    this.loginService.login().subscribe(users => {
      var user = (users as User[]).find(p => p.user == request['username'] && p.password == request['password'])
      if(user){
        alert("Sesión iniciada\nToken: " + user.token);
      }else{
        alert("Usuario o contraseña incorrecta");
      }
    });
  }

}
