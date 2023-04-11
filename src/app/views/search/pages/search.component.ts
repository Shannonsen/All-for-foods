import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from '../../shared/models/food.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

/**
 * La clase representa la página para la búsqueda
 * @extends OnInit
 */
export class SearchComponent implements OnInit {

  foods: Food[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number[] = [];

  constructor(private recipeService: RecipesService) { }


  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.foods = recipes as Food[];
    })
  }

}
