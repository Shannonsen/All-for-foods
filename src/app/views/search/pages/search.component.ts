import { Component, OnInit } from '@angular/core';
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
  sectionName: string = 'Recetas filtradas';
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  /**
   * @constructor
   * @param {RecipesService} recipeService : Servicio de recetas
   */
  constructor(private recipeService: RecipesService) { }
  /**
   * @override
   */
  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.foods = recipes as Food[];
    })
  }
}
