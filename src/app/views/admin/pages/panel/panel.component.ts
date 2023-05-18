import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';
/**
 * Clase para las funcionalidades del administrador.
 */
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  recipesActivated: Food[] = []
  recipesDesactivated: Food[] = []
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  typeSearch: string = "";
  isPanel: string = "";

  /**
   * @constructor
   * @param recipeService : Servicio de recetas
   * @param cookieService : Servicio de cookies
   */
  constructor(private recipeService: RecipesService, private cookieService: CookieService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    var token = this.cookieService.get('Token');
    this.recipeService.getAllRecipesActivated(token, 1).subscribe(data =>{
      this.recipesActivated = data.data
    })

    this.recipeService.getAllRecipesDesactivated(token, 1).subscribe(data =>{
      this.recipesDesactivated = data.data
    })
  }

}
