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
 * Clase que representa el buscador de recetas.
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
  @Input() profile: string =""
  @Input() recipeID:number=0

  /**
   *
   * @param {KeyValueDiffers} differs : Detecta cambios en los objetos.
   * @param {IngredientsService} ingredientService : Servicio de ingredientes.
   * @param {CookieService} cookieService : Servicio de cookies
   * @param {GetAllPaginationService} getAllService : Servicio de obtención listados para el reciclaje de la paginación.
   */
  constructor(private differs: KeyValueDiffers, private ingredientService: IngredientsService, private cookieService: CookieService, private getAllService: GetAllPaginationService) {
    this.differ = this.differs.find({}).create();
  }
  /**
   * @override
   */
  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients.data;
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
          this.doSearchTrigger();
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
    if(this.keyword){
      this.typeSearch = "title-search"
    }
    var token = this.cookieService.get('Token');
    var idUser = Number(this.cookieService.get('idUser'));
    var ingredients:any =  this.elementsSelected.map(function(a:any) { return a["id"]; });
    if(this.typeSearch == 'my-recipes'){
      idUser = this.profile == null ? Number(this.cookieService.get('idUser')): Number(this.profile)
    }
      this.getAllService.getServiceRecipes(this.typeSearch,this.currentPage,token,idUser, this.recipeID, this.keyword, ingredients).subscribe(recipes => {
        var recipeToSend = recipes.data
        var totalPage = recipes.totalPage
        var totalPagesToSend = this.totalPagesArray(totalPage);
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
        this.getAllService.getServiceRecipes(this.typeSearch,this.currentPage,token, idUser,this.recipeID, this.keyword, ingredients).subscribe(recipes => {
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
      var token = this.cookieService.get('Token');
      var idUser = Number(this.cookieService.get('idUser'));
      var ingredients:any =  this.elementsSelected.map(function(a:any) { return a["id"]; });
      this.getAllService.getServiceRecipes('ingredient-search',this.currentPage,token,idUser, this.recipeID, this.keyword, ingredients).subscribe(recipes => {
        var recipeToSend = recipes.data
        var totalPage = recipes.totalPage
        var totalPagesToSend = this.totalPagesArray(totalPage);
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
        this.getAllService.getServiceRecipes('ingredient-search',this.currentPage, token, idUser,this.recipeID, this.keyword, ingredients).subscribe(recipes => {
        this.outputRecipes.emit(recipes.data);
        });
      });
    }
  }

  /**
   * Método que se encarga de crear una lista numérica para la paginación
   * @returns {number} Arreglo de números de tal forma [1, 2, ..., n]
   */
  totalPagesArray(totalPage: number): number[] {
    const pageCount = Math.ceil(totalPage); // total numero de paginas
    return Array.from({ length: pageCount }, (_, i) => i + 1); // crea un array del numero de paginas
  }
}
