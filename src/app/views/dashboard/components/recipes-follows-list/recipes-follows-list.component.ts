import { Component, OnInit, Input} from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-recipes-follows-list',
  templateUrl: './recipes-follows-list.component.html',
  styleUrls: ['./recipes-follows-list.component.scss']
})
export class RecipesFollowsListComponent implements OnInit {

  @Input() myFollowsRecipes: number[] = [];
  myRecipesList: Food[] = [];

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  sectionName: string = 'Recetas de seguidores';

  /**
   * @constructor
   * @param {RecipesService} recipeService : Servicio de recetas.
   */
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.myRecipesList = (recipes as Food[]).filter(p => this.myFollowsRecipes.includes(p.id));
      const pageCount = Math.ceil(this.myFollowsRecipes.length / this.pageSize);
      this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
    });
  }

  /**
   * Método que se encarga de devolver un listado de recetas para mostrar en una determinada página.
   * @param {pageNumber} pageNumber : página actual
   * @returns {Food[]} : listado de recetas que apareceran en una pagina.
   */
  loadPage(pageNumber: number): Food[] {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize
    return this.myRecipesList.slice(startIndex, endIndex);
  }

}
