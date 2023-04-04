import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Food[] = []

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipe => {
      this.products = recipe;
    });
  }
}
