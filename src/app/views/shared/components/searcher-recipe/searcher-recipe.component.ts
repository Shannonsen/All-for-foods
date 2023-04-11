import { Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import * as $ from "jquery"
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Food } from '../../models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
/**
 * Clase que representa el buscador de recetas
 */
@Component({
  selector: 'app-searcher-recipe',
  templateUrl: './searcher-recipe.component.html',
  styleUrls: ['./searcher-recipe.component.scss']
})
export class SearcherRecipeComponent implements OnInit {

  titleRadioChecked = $("#title").is(":checked");
  keywordBefore = '';
  keyword = '';
  keywordAutocomplete = 'name';
  ingredients: Ingredient[] = [];
  elementsSelected: Ingredient[] = [];
  differ: any;
  doSearch: boolean = false;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 3;
  @Output() outputRecipes = new EventEmitter<Food[]>();
  @Output() outputTotalPages = new EventEmitter<number[]>();
  @Output() outputCurrentPage = new EventEmitter<number>();
  /**
   * @constructor
   * @param {KeyValueDiffers} differs : Detecta cambios en los objetos
   * @param {IngredientsService} ingredientService : Servicio de ingredientes
   * @param {RecipesService} recipesService : Servicio de recetas 
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
  /**
   * Método lanzado cuando un objeto cambia de valor
   */
  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item: any) => {
        if (item.key == 'currentPage') {
          this.onEnter(undefined);
        }
        if (item.key == 'elementsSelected') {
          console.log("change selected");
        }
        if (item.key == 'doSearch') {
          this.doSearchTrigger();
        }
      });
    }
  }
  /**
   * Método para controlar el comportamiento del componente al cambiar de radio button
   */
  onClick() {
    this.titleRadioChecked = $("#title").is(":checked");
  }
  /**
   * Método que maneja el comportamiento al seleccionar una opción
   * @param {any} item : Elemento de la lista de opciones del autocomplete
   */
  selectEvent(item: any) {
    if (this.elementsSelected.findIndex(x => x.id == item.id) == -1) {
      this.elementsSelected.push(item);
    }
  }
  /**
   * Método lanzado cuando ocurre un cambio en la barra de búsqueda
   * @param {string} val : Valor de texto de la barra de búsqueda
   */
  onChangeSearch(val: string) {
    this.keyword = val;
  }
  /**
   * Evento lanzado al dar enter en la barra de búsqueda
   * @param {any} e : Elemento html al cual que se le dio Enter
   */
  onEnter(e: any) {
    this.recipesService.getAllFoods().subscribe(recipes => {
      var recipeToSend = [];
      if (this.keyword == '') {
        recipeToSend = recipes;
      } else {
        recipeToSend = (recipes as Food[]).filter(x => x.name.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase()));
      }
      var totalPagesToSend = this.totalPagesArray(recipeToSend);
      this.outputTotalPages.emit(totalPagesToSend);
      if (this.currentPage > totalPagesToSend.length) {
        this.currentPage = 1;
        this.outputCurrentPage.emit(this.currentPage);
      } else {
        if (this.keyword != this.keywordBefore) {
          this.keywordBefore = this.keyword
          this.currentPage = 1;
          this.outputCurrentPage.emit(this.currentPage);
        }
      }
      this.outputRecipes.emit(this.recipesToPagination(recipeToSend));
    });
  }

  doSearchTrigger() {
    if (this.doSearch) {
      this.doSearch = false;
      this.recipesService.getAllFoods().subscribe(recipes => {
        var recipeToSend = [];
        if (this.elementsSelected.length == 0) {
          recipeToSend = recipes;
        } else {
          var ingredientStr: string[] = [];
          this.elementsSelected.forEach(element => {
            ingredientStr.push(element.name);
          });
          console.log(ingredientStr);
          (recipes as Food[]).forEach(recipe => {
            if(this.checkSubset(recipe.ingredients, ingredientStr)){
              recipeToSend.push(recipe);
            }
          });
        }
        var totalPagesToSend = this.totalPagesArray(recipeToSend);
        this.outputTotalPages.emit(totalPagesToSend);
        if (this.currentPage > totalPagesToSend.length) {
          this.currentPage = 1;
          this.outputCurrentPage.emit(this.currentPage);
        } else {
          if (this.keyword != this.keywordBefore) {
            this.keywordBefore = this.keyword
            this.currentPage = 1;
            this.outputCurrentPage.emit(this.currentPage);
          }
        }
        this.outputRecipes.emit(this.recipesToPagination(recipeToSend));
      });
    }
  }

  checkSubset = (parentArray: any, subsetArray: any) => {
    return subsetArray.every((el: any) => {
      return parentArray.includes(el)
    })
  }
  /**
   * Método que se encarga de tranformar el resultado completo de las recetas a la página correspondiente
   * @param {Food[]} recipes : Lista de recetas de la solcitud original antes de convertirla a paginación 
   * @returns {Food[]} Receta paginada
   */
  recipesToPagination(recipes: Food[]): Food[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return recipes.slice(startIndex, endIndex);
  }
  /**
   * Método que se encarga de crear una lista numérica para la paginación
   * @param {Food[]} recipes : Lista de recetas de la solicitud original antes de convertirla a paginación
   * @returns {number} Arreglo de números de tal forma [1, 2, ..., n]
   */
  totalPagesArray(recipes: Food[]): number[] {
    const pageCount = Math.ceil(recipes.length / this.pageSize); // total number of pages
    return Array.from({ length: pageCount }, (_, i) => i + 1); // create an array of page numbers
  }
}