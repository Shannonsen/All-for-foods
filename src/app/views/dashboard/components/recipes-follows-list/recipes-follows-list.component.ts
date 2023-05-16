import { Component, OnInit, Input} from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';
/**
 * Clase que representa el listado de las recetas de usuarios seguidos.
 */
@Component({
  selector: 'app-recipes-follows-list',
  templateUrl: './recipes-follows-list.component.html',
  styleUrls: ['./recipes-follows-list.component.scss']
})
export class RecipesFollowsListComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  sectionName: string = 'Recetas de seguidores';
  @Input() foods: Food[] = [];
  @Input() typeSearch:string = ""
  @Input() isPanel:string = ""
  @Input() typeList: string = "";

  /**
   * @constructor
   */
  constructor() { }

  /**
   * @override
   */
  ngOnInit(): void {}

}
