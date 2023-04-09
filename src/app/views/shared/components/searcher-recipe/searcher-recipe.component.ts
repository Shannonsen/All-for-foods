import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { TagInputComponent } from '../tag-input/tag-input.component';

@Component({
  selector: 'app-searcher-recipe',
  templateUrl: './searcher-recipe.component.html',
  styleUrls: ['./searcher-recipe.component.scss']
})
export class SearcherRecipeComponent implements OnInit {

  titleRadioChecked = $("#title").is(":checked");
  keyword = 'name';
  ingredients: Ingredient[] = [];
  strIngredients: string[] = [];

  constructor(private ingredientService: IngredientsService, private tagInput: TagInputComponent) { }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      this.ingredients.forEach(element => {
        this.strIngredients.push(element.name);
      });
    });

    $("#title").prop('checked', true);
    this.titleRadioChecked = $("#title").is(":checked");
  }

  selectEvent(item: any) {
    console.log(item);
    this.tagInput.itemsAsObjects.push(item);
    console.log(this.tagInput.itemsAsObjects);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // do something when input is focused
  }

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
