import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';


@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  @Input() recipes: Food[] = [];

  recipeID: number = 0;
  title: string | undefined = '';
  author: number | undefined = 0;
  ingredients: string[] | undefined = [];
  imgURL: string | undefined = '';
  process: string[] | undefined = [];
  description: string | undefined = '';
  rating: number | undefined = 0;;
  date: string | undefined = '';

  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private recipeService: RecipesService) {
    this.recipeForm = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
      }
    });
  }

  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID).subscribe(recipe => {
      this.author = recipe?.author;
      this.description = recipe?.description;
      this.title = recipe?.name;
      this.ingredients = recipe?.ingredients;
      this.imgURL = recipe?.image;
      this.process = recipe?.process;
      this.rating = recipe?.rating;
      this.date = recipe?.date;
    })
  }
  
}
