import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';
/**
 * Clase encargada de mostrar la lista de recetas autoría del usuario.
 */

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrls: ['./my-recipes-list.component.scss']
})
export class MyRecipesListComponent implements OnInit {
  @Input() myRecipes: number[] = []
  @Input() foods: Food[] = [];
  @Input() typeSearch:string = "my-recipes"
  @Input() isPanel:string = ""
  @Input() typeList: string = "products";
  @Input() profile:string = ""

  myRecipesList: Food[] = [];


  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  sectionName: string = 'Mis Recetas';

  /**
   * @constructor
   * @param {RecipesService} recipeService : Servicio de recetas.
   */
  constructor(private recipeService: RecipesService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.myRecipesList = (recipes as Food[]).filter(p => this.myRecipes.includes(p.id));

    const pageCount = Math.ceil(this.myRecipes.length / this.pageSize);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
    })
  }

  /**
   * Método que regresa el listado de recetas a mostrar en el paginado actual de la lista.
   * @param pageNumber : El valor del paginado actual.
   * @returns {Food[]} : Regresa un listado de recetas.
   */
  loadPage(pageNumber: number): Food[] {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize
    return this.myRecipesList.slice(startIndex, endIndex);
  }
}
