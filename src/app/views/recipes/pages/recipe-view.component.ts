import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { Ingredient } from '../../shared/models/ingredient.model';

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
  ingredients: Ingredient[] = [];
  imgURL: string | undefined = '';
  process: string| undefined = "";
  description: string | undefined = '';
  rating: number | undefined = 0;
  date: string | null = "";

  recipeForm: FormGroup;

  displayButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private recipeService: RecipesService, private UserService: UserService, private cookieService: CookieService, private pipe: DatePipe) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
      }
    });
    this.displayEditButton();
  }

  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID).subscribe((recipe) => {
      console.log(recipe)
      var recipeResult = recipe?.results as Food
      this.author = recipeResult.user.id;
      this.description = recipeResult.description
      this.title = recipeResult.title;
      this.ingredients = recipe?.results.ingredients;
      this.imgURL = recipeResult.image;
      this.process = recipeResult.steps;
      this.rating = recipeResult.rate;
      this.date = this.pipe.transform(recipeResult.createdAt, 'yyyy-MM-dd');
    })
  }

  displayEditButton(){
    var idUser = this.cookieService.get('idUser');
    this.recipeService.getRecipeById(this.recipeID).subscribe((recipe) => {
      if(recipe.results.user.id == idUser){
        this.displayButton = true
      }else{
        this.displayButton = false;
      }
    })
  }

}
