import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/views/shared/models/user.model';

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
  modificationDate: string | undefined;

  recipeForm: FormGroup;
  user: User = <User>{};

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private recipeService: RecipesService, private userService: UserService) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    this.modificationDate = date + "-" + month + "-" + year;

    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
      } else {
        this.imgURL = "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png";
      }

      const tkn = localStorage.getItem('Token');
      this.userService.getAllUsers().subscribe(users => {
        var user = (users as User[]).find(p => p.token === tkn);
        this.user = <User>user;
        this.author = user!.user;
      })

      this.recipeForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        ingredients: new FormControl('', [Validators.required, Validators.minLength(4)]),
        imgURL: new FormControl('', [Validators.required, Validators.minLength(4)]),
        process: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', [Validators.required, Validators.minLength(4)])
      });
    });
  }

  onSave() {
    if (Number.isNaN(this.recipeID)) {
      this.recipeID = 0;
      this.recipeService.getFoodCount().subscribe(count => {
        this.recipeID = count + 1;
      });
      //creation date == last modified == modification date
        alert('receta actualizada\nid:' + this.recipeID);
    }else{
      //last modified == modification date
      alert('receta actualizada\nid:' + this.recipeID);
    }
  }

  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID).subscribe(recipe => {
      this.description = recipe?.description;
      this.title = recipe?.name;
      this.ingredients = recipe?.ingredients;
      this.imgURL = recipe?.image;
      this.process = recipe?.process;
    });
  }

}
