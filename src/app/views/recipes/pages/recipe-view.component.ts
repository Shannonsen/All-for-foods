import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

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
  process: string| undefined = "";
  description: string | undefined = '';
  rating: number | undefined = 0;;
  date: string | undefined = '';

  recipeForm: FormGroup;

  displayButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private recipeService: RecipesService, private UserService: UserService, private cookieService: CookieService) {
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
      var recipeResult = recipe?.results as Food

      this.author = recipeResult.user.id;
      this.description = recipeResult.description
      this.title = recipeResult.title;
      this.ingredients = recipe?.ingredients;
      this.imgURL = recipeResult.image;
      this.process = recipeResult.steps;
      this.rating = recipeResult.rate;
      this.date = recipe?.creationDate;
    })
  }

  displayEditButton(){
    var idUser = this.cookieService.get('idUser');
    console.log(this.recipeID)
    this.recipeService.getRecipeById(this.recipeID).subscribe((recipe) => {
      if(recipe.results.user.id == idUser){
        this.displayButton = true
      }else{
        this.displayButton = false;
      }
    })
  }

}
