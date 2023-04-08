import { Component, Input, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() recipes: Food[] = [];

  recipeID: number= this.recipes.length;
  title: string | undefined= '';
  author: string | undefined= '';
  ingredients: string[] | undefined = [];
  imgURL: string | undefined = '';
  process: string[] | undefined = [];
  description: string | undefined= '';


  
  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private recipeService: RecipesService, private router: Router) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.recipeService.getRecipeById(1).subscribe(recipe =>{
      this.author = recipe?.author;
      this.description = recipe?.description;
      this.title = recipe?.name;
      this.ingredients = recipe?.ingredients;
      this.imgURL = recipe?.image;
      this.process = recipe?.process;
    })

    this.recipeForm = new FormGroup({
      title : new FormControl('', [Validators.required, Validators.minLength(4)]),
      ingredients: new FormControl('', [Validators.required, Validators.minLength(4)]),
      process: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSave(){
    alert("receta actualizada")
  }

}
