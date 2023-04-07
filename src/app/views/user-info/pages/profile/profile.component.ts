import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  description: string = '';

  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.profileForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginService.login().subscribe(users => {
      this.email = users[0].email;
      this.name = users[0].user;
      this.description = users[0].description;
    });
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onEdit(){
    /* this.router.navigate(['profile/edit']) */
    alert("información actualizada")
  }

}
