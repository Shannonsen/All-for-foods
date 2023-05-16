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

  /**
   *@constructor
   */
  constructor() {

  }
/**
 * @override
 */
  ngOnInit(): void {}

}
