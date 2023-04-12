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
  @Input() favorites: number[] = []
  favs: Food[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number[] = [];
  sectionName: string = 'Mis Favoritos';

  /**
   * @constructor
   * @param recipeService : Servicio de recetas.
   */
  constructor(private recipeService: RecipesService) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.favs = (recipes as Food[]).filter(p => this.favorites.includes(p.id));
    })    
    const pageCount = Math.ceil(this.favorites.length / this.pageSize);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  /**
   * Método que regresa el listado de recetas a mostrar en el paginado actual de la lista.
   * @param {number} pageNumber : El valor del paginado actual.
   * @returns {Food[]} : Regresa un listado de recetas.
   */
  loadPage(pageNumber: number): Food[] {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize
    return this.favs.slice(startIndex, endIndex);
  }
}

