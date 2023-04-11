import { Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import * as $ from "jquery"
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Food } from '../../models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-searcher-recipe',
  templateUrl: './searcher-recipe.component.html',
  styleUrls: ['./searcher-recipe.component.scss']
})
export class SearcherRecipeComponent implements OnInit {

  titleRadioChecked = $("#title").is(":checked");
  keyword = '';
  keywordAutocomplete = 'name';
  ingredients: Ingredient[] = [];
  elementsSelected: Ingredient[] = [];
  recipes: Food[] = [];
  differ: any;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 3;
  @Output() outputRecipes = new EventEmitter<Food[]>();
  @Output() outputTotalPages = new EventEmitter<number[]>();


  /**
   * @constructor
   * @param {IngredientsService} ingredientService - Servicio de ingredientes
   */
  constructor(private differs: KeyValueDiffers, private ingredientService: IngredientsService, private recipesService: RecipesService) {
    this.differ = this.differs.find({}).create();
  }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });

    $("#title").prop('checked', true);
    this.titleRadioChecked = $("#title").is(":checked");
    this.onEnter(undefined);
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item: any) => {
        if (item.key == 'currentPage') {
          this.onEnter(undefined);
        }
      });
    }
  }

  /**
   * Método que maneja el comportamiento al seleccionar una opción
   * @param {any} item :  Elemento de la lista de opciones del autocomplete
   */
  selectEvent(item: any) {
    if (this.elementsSelected.findIndex(x => x.id == item.id) != -1) {
      //SHOW A CUSTOM ALERT FOR FEEDBACK
    } else {
      this.elementsSelected.push(item);
    }
  }

  /**
   * Método lanzado cuando ocurre un cambio en la barra de búsqueda
   * @param {string} val :  Valor de texto de la barra de búsqueda
   */
  onChangeSearch(val: string) {
    this.keyword = val;
  }
  /**
   * Método que maneja el comportamiento de un elemento html enfocado
   * @param {any} e :  Elemento html cuando se enfoca en la barra de búsqueda
   */
  onFocused(e: any) {
  }

  /**
   * Evento lanzado al dar enter en la barra de búsqueda
   * @param {any }e : Elemento html al cual que se le dio Enter
   */
  onEnter(e: any) {
    this.recipesService.getAllFoods().subscribe(recipes => {
      var recipeToSend = [];
      if (this.keyword == '') {
        recipeToSend = recipes;
      } else {
        recipeToSend = (recipes as Food[]).filter(x => x.name.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase()));
      }
      this.outputTotalPages.emit(this.totalPagesArray(recipeToSend));
      this.outputRecipes.emit(this.recipesToPagination(recipeToSend));
    });
  }

  changeSearch() {
    console.log("Todo");
  }

  onClick() {
    this.titleRadioChecked = $("#title").is(":checked");
  }

  recipesToPagination(recipes: Food[]): Food[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return recipes.slice(startIndex, endIndex);
  }

  totalPagesArray(recipes: Food[]): number[] {
    const pageCount = Math.ceil(recipes.length / this.pageSize); // total number of pages
    return Array.from({ length: pageCount }, (_, i) => i + 1); // create an array of page numbers
  }
}
