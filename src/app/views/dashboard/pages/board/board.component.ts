import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  products: Food[] = []

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipe => {
      this.products = recipe;
    });
  }

}
