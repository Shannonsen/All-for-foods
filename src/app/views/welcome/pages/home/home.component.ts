import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';
/**
 * Clase que representa el home
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Food[] = []

  /**
   *@constructor
   * @param {RecipesService} recipeService : Servicio de recetas
   */
  constructor(private recipeService: RecipesService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe((recipe) => {
      this.products = (recipe.results as Food[]).filter(p => p.id <= 4);
    });
  }
}
