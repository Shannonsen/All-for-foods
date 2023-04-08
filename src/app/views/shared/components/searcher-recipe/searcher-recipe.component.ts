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


  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientsService) { }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  onEnter() {
    console.log("Enter");
  }

  changeSearch(){
    console.log("Todo");
  }

  onClick() {
    var title = $("#title").is(":checked");
    if(title){
      console.log("title is selected");
    }else{
      console.log("title is not selected");
      console.log(this.ingredients);
    }
  }
}
