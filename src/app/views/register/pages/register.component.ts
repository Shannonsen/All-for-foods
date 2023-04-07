import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helper/mustmatch';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

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

  onSubmit() {
    this.registerService.registerUser().subscribe(response => {
      if (response.status == 201) {
        alert("Usuario creado");
        this.router.navigate(['login']);
      }
    });
  }
}
