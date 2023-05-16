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

  @Input() foods: Food[] = [];
  @Input() typeSearch:string = "my-recipes"
  @Input() isPanel:string = ""
  @Input() typeList: string = "products";
  @Input() profile:string = ""

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  sectionName: string = 'Mis Recetas';

  /**
   * @constructor
   */
  constructor() { }

  /**
   * @override
   */
  ngOnInit(): void {
  }
}
