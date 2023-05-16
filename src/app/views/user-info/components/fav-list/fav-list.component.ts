import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
/**
 * Clase encargada de mostrar la lista de recetas favoritas.
 */
@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {
  @Input() foods: Food[] = [];
  @Input() typeSearch:string = "favorites"
  @Input() isPanel:string = ""
  @Input() typeList: string = "products";

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  sectionName: string = 'Mis Favoritos';

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

