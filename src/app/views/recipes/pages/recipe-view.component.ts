import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/views/shared/models/comment.model'; //Importar el modelo de comentarios

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
  comments: Comment[] = []; //Agrega la propiedad comments

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private recipeService: RecipesService, private commentService: CommentService) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
        this.commentService.getCommentsByRecipeId(this.recipeID).subscribe(comments => {
          this.comments = comments; //Asigna los comentarios recuperados por el servicio a la propiedad comments
        });
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
