import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { User } from 'src/app/views/shared/models/user.model';

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
  //favs: Food[] = []
  user: User = <User>{};

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private userService: UserService, private recipeService: RecipesService) {
    this.profileForm = this.formBuilder.group({});
  }

  ngOnInit(): void {

    const tkn = localStorage.getItem('Token');

    this.userService.getAllUsers().subscribe(users => {
      var user = (users as User[]).find(p => p.token === tkn);
      this.user = <User>user;
      
      this.name = user!.user;
      this.email = user!.email;
      this.description = user!.description;
    })

    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onEdit() {
    /* this.router.navigate(['profile/edit']) */
    alert("información actualizada")
  }

  follow() {
    const star = document.getElementById("btn-follow")!;
    if (star.style.backgroundColor == "mediumaquamarine") {
      star.style.backgroundColor = "crimson";
      star.innerHTML = "Seguir";
      star.style.scale = "1";
    } else {
      star.style.backgroundColor = "mediumaquamarine";
      star.innerHTML = "Siguiendo";
      star.style.scale = "1";
    }

  }

}
