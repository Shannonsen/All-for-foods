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
  process: string| undefined = "";
  description: string | undefined = '';
  rating: number | undefined = 0;;
  date: string | undefined = '';

  recipeForm: FormGroup;

  commentsPerRecipe: Comment[] = [];
  comments : Comment[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private recipeService: RecipesService, private commentService: CommentService) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
        this.chargeComments();
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
      this.date = recipe?.creationDate;
    })
  }

  chargeComments() {
    var request = this.recipeForm.value;
    this.commentService.getAllComments().subscribe(comments => {
      var comment = (comments as Comment[]).find(p => p.author === request['id'])
      if (comment) {
       this.commentsPerRecipe.push(comment);
      } 
    });
  }
}