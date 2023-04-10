import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-searcher-recipe',
  templateUrl: './searcher-recipe.component.html',
  styleUrls: ['./searcher-recipe.component.scss']
})
export class SearcherRecipeComponent implements OnInit {

  titleRadioChecked = $("#title").is(":checked");
  keyword = 'name';
  ingredients: Ingredient[] = [];
  elementsSelected: Ingredient[] = [];

  /**
   * @constructor
   * @param {IngredientsService} ingredientService - Servicio de ingredientes
   */
  constructor(private ingredientService: IngredientsService) { }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });

    $("#title").prop('checked', true);
    this.titleRadioChecked = $("#title").is(":checked");
  }

  /**
   * Método que maneja el comportamiento al seleccionar una opción
   * @param {any} item :  Elemento de la lista de opciones del autocomplete
   */
  selectEvent(item: any) {
    if(this.elementsSelected.findIndex(x => x.id ==item.id) != -1){
      //SHOW A CUSTOM ALERT FOR FEEDBACK
    }else{
      this.elementsSelected.push(item);
    }
  }

  /**
   * Método lanzado cuando ocurre un cambio en la barra de búsqueda
   * @param {string} val :  Valor de texto de la barra de búsqueda
   */
  onChangeSearch(val: string) {
  }
  /**
   * Método que maneja el comportamiento de un elemento html enfocado
   * @param {any} e :  Elemento html cuando se enfoca en la barra de búsqueda
   */
  onFocused(e: any){
  }

  /**
   * 
   * @param {any }e : Elemento html al cual 
   */
  onEnter(e : any) {
    console.log("Hola");
  }

  changeSearch(){
    console.log("Todo");
  }

  onClick() {
    this.titleRadioChecked = $("#title").is(":checked");
  }
}
