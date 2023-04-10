import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() recipes: Food[] = [];

  recipeID: number = 0;
  title: string | undefined = '';
  author: string | undefined = '';
  ingredients: string[] | undefined = [];
  imgURL: string | undefined = '';
  process: string[] | undefined = [];
  description: string | undefined = '';

  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private recipeService: RecipesService, private userService: UserService) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
      }

      this.recipeForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        ingredients: new FormControl('', [Validators.required, Validators.minLength(4)]),
        process: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', [Validators.required, Validators.minLength(4)])
      });
    });
  }

  onSave() {
    alert('receta actualizada');
  }

  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID).subscribe(recipe => {
      this.description = recipe?.description;
      this.title = recipe?.name;
      this.ingredients = recipe?.ingredients;
      this.imgURL = recipe?.image;
      this.process = recipe?.process;

      if (recipe?.author) {
        this.userService.getUserById(recipe.author).subscribe(author => {
          this.author = author?.user;
        });
      }
    })
  }

}
