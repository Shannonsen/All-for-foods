import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';
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
    this.loginService.login().subscribe(users => {
      this.email = users[0].email;
      this.name = users[0].user;
      this.description = users[0].description;
    });

    
    this.userService.getAllUsers().subscribe(users => {
      var user = (users as User[]).find(p => p.id == 1)
      this.user = <User>user;
    })

    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    /*
    this.recipeService.getAllFoods().subscribe(recipe => {
      this.favs = recipe;
    });
    */
  }

  onEdit(){
    /* this.router.navigate(['profile/edit']) */
    alert("información actualizada")
  }

}
