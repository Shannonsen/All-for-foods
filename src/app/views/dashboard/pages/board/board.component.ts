import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { User } from 'src/app/views/shared/models/user.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  products: Food[] = []
  user: User = <User>{};

  constructor(private recipeService: RecipesService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      var user = (users as User[]).find(p => p.id == 1)
      this.user = <User>user;
    })

    this.recipeService.getAllFoods().subscribe(recipe => {
      this.products = recipe;
    });
  }

}
