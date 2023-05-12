import { Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output } from '@angular/core';
import * as $ from "jquery"
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Food } from '../../models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { CookieService } from 'ngx-cookie-service';
import { GetAllPaginationService } from 'src/app/services/get-all-pagination.service';
import { LoginService } from 'src/app/services/login.service';
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
  recipeActual: Food[] = []
  userid: any = ""
  @Input() barSearch:string = "";
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 3;
  @Output() outputRecipes = new EventEmitter<Food[]>();
  @Output() outputTotalPages = new EventEmitter<number[]>();
  @Output() outputCurrentPage = new EventEmitter<number>();
  @Input() typeSearch: string = "";
  /**
   * @constructor
   * @param {KeyValueDiffers} differs : Detecta cambios en los objetos
   * @param {IngredientsService} ingredientService : Servicio de ingredientes
   * @param {RecipesService} recipesService : Servicio de recetas
   */
  constructor(private differs: KeyValueDiffers, private ingredientService: IngredientsService, private recipesService: RecipesService, private cookieService: CookieService, private getAllService: GetAllPaginationService, private loginService: LoginService) {
    this.differ = this.differs.find({}).create();
  }
  /**
   * @override
   */
  ngOnInit(): void {
    var token = this.cookieService.get('Token');
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
    var token = this.cookieService.get('Token');
    var idUser = Number(this.cookieService.get('idUser'));
      this.getAllService.getServiceRecipes(this.typeSearch,this.currentPage,4,token,idUser).subscribe(recipes => {
        var recipeToSend = recipes.data
        var totalPage = recipes.totalPage
        var totalPagesToSend = this.totalPagesArray(recipeToSend, totalPage);
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
        this.getAllService.getServiceRecipes(this.typeSearch,this.currentPage,4,token, idUser).subscribe(recipes => {
        this.outputRecipes.emit(recipes.data);
        });
      });
    }

  /**
   * Método lanzado cuando se da clic en el botón de búsqueda del componente de entrada de etiquetas
   */
  doSearchTrigger() {
    if (this.doSearch) {
      this.doSearch = false;
      this.recipesService.getAllFoods().subscribe(recipes => {
        var recipeToSend = [];
        if (this.elementsSelected.length == 0) {
          recipeToSend = recipes.data;
        } else {
          recipeToSend = this.getRecipesByIngredients(recipes as Food[])
        }
        var totalPage = recipes.totalPage
        var totalPagesToSend = this.totalPagesArray(recipeToSend, totalPage);
        if (this.currentPage > totalPagesToSend.length) {
          this.currentPage = 1;
        }
        this.outputTotalPages.emit(totalPagesToSend);
        this.outputCurrentPage.emit(this.currentPage);
        this.recipesService.getAllFoods(this.currentPage,4).subscribe(recipes => {
          this.outputRecipes.emit(recipes.data);
        });
      });
    }
  }
  /**
   * Método que obtiene las recetas de acuerdo a los ingredientes de this.elementsSelected
   * @param {Food[]} recipes : Lista de recetas obtenidas del servico
   * @returns {Food[]} Recetas que coincidieron con los ingredietes
   */
  getRecipesByIngredients(recipes: Food[]) : Food[]{
    var ingredientStr: string[] = [];
    var recipeResponse: Food[] = [];
    this.elementsSelected.forEach(element => {
      ingredientStr.push(element.name);
    });
    recipes.forEach(recipe => {
      if (this.checkSubset(recipe.ingredients, ingredientStr)) {
        recipeResponse.push(recipe);
      }
    });
    return recipeResponse;
  }
  /**
   * Método encargado de validar si un conjunto contiene un subconjunto
   * @param parentArray : Arreglo al cual se le va a revisar si contiene un subconjunto
   * @param subsetArray : Subarreglo el cual se utilizará para revisar si está dentro de otro arreglo
   * @returns {boolean} Verdadero si el subsetArray se encuentra en el parentArray, de otra manera será falso
   */
  checkSubset = (parentArray: any, subsetArray: any) => {
    return subsetArray.every((el: any) => {
      return parentArray.includes(el)
    })
  }

  /**
   * Método que se encarga de crear una lista numérica para la paginación
   * @param {Food[]} recipes : Lista de recetas de la solicitud original antes de convertirla a paginación
   * @returns {number} Arreglo de números de tal forma [1, 2, ..., n]
   */
  totalPagesArray(recipes: Food[], totalPage: number): number[] {
    const pageCount = Math.ceil(totalPage); // total number of pages
    return Array.from({ length: pageCount }, (_, i) => i + 1); // create an array of page numbers
  }
}
