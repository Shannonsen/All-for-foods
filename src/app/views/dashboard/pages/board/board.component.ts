import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { User } from 'src/app/views/shared/models/user.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
/**
 * Clase que representa el dashboard.
 * Clase donde estará el listado de recetas de los usuarios seguidos y los usuarios mismos.
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  products: Food[] = []
  user: User = <User>{};

  /**
   *@constructor
   * @param {RecipesService} recipeService : Servicio de recetas
   * @param {UserService} userService : Servicio de usuarios
   */
  constructor(private recipeService: RecipesService, private userService: UserService) {

  }
/**
 * @override
 */
  ngOnInit(): void {
    const tkn = localStorage.getItem('Token');
    this.userService.getAllUsers().subscribe(users => {
      var user = (users as User[]).find(p => p.token == tkn)
      this.user = <User>user;
    })

    this.recipeService.getAllFoods().subscribe(recipe => {
      this.products = recipe;
    });
  }

}
