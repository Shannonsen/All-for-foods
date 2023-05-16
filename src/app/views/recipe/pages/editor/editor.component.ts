import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/views/shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Ingredient } from 'src/app/views/shared/models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';

/**
 * Clase que representa el editor de recetas.
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() recipes: Food[] = [];

  recipeID: number = 0 ;
  title: string | undefined = '';
  author: string | undefined = '';
  allingredients: Ingredient[] = [];
  ingredients: Ingredient[]= [];
  imgURL: string | undefined = '';
  process: string | undefined = "";
  description: string | undefined = '';
  modificationDate: string | undefined;
  recipeForm: FormGroup;
  user: User = <User>{};

  /**
   * @constructor
   * @param formBuilder : Creador del formulario.
   * @param route : Navegador de rutas.
   * @param recipeService : Servicio de recetas.
   * @param userService : Servicio de usuarios.
   */
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private recipeService: RecipesService, private userService: UserService, private cookieService: CookieService, private router: Router, private ingredientService: IngredientsService) {
    this.recipeForm = this.formBuilder.group({});
  }

  /**
   * @override
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
      } else {
        this.imgURL = "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png";
      }
      this.recipeForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        imgURL: new FormControl('', [Validators.required, Validators.minLength(4)]),
        process: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', [Validators.required, Validators.minLength(4)]),
        author: new FormControl(''),
      });
    });

    this.ingredientService.getAllIngredients().subscribe(ingredients =>{
      this.allingredients = ingredients.data
    })
  }

  saveIngredient(e: any){
    const selectedOptionValue = e.target.value;
    const selectedOption = e.target.selectedOptions.item(0);
    const selectedOptionText = selectedOption.textContent;
    let new_ingredient: Ingredient ={
      'id': Number(selectedOptionValue),
      'name': selectedOptionText
    }

    if(this.ingredients.find(ingredient => ingredient.id == e.target.value)){
      Swal.fire("CORRECTO", 'YA COLOCASTE ESTE INGREDIENTE', 'question')
    }else{
      this.ingredients.push(new_ingredient)
    }
  }

  deleteIngredient(id: number){
    this.ingredients.splice(this.ingredients.findIndex(e => e.id === id),1);
  }

  /**
   * Método lanzado cuando se oprime el botón Save.
   */
  onSave() {
    var request = this.recipeForm.value;
    var idUser = this.cookieService.get('idUser');
    var token = this.cookieService.get('Token');
    type recipeBody ={
      userId: string,
      image?: string,
      title?: string,
      description?: string,
      ingredients?: any[],
      steps?: string,
    }
    const body: recipeBody = {
      'userId': idUser,
    };
    this.route.params.subscribe(params => {
    this.recipeID = Number(params['id']);
      if (Number.isNaN(this.recipeID)) {
        body.title = request['title'];
        body.image = request['imgURL'];
        body.description = request['description'];
        var newIngredients:any = this.ingredients.map(function(a:any) { return a["id"]; });
        body.ingredients = newIngredients;
        body.steps = request['process'];
        this.recipeService.postRecipe(token, body).subscribe(result =>{
          console.log(result)
          if(result.code == 201){
            Swal.fire("CORRECTO", 'Receta creada', 'success').then(()=>{
              this.router.navigate(['recipes/' + result.results.id]).then(() => {
                window.location.reload();
              });
            })
          }else{
            Swal.fire("ERROR", result.message, 'error').then(()=>{
              this.router.navigate(['recipes/' + result.results.id]).then(() => {
                window.location.reload();
              });
            })
          }
        })
      }else{
        this.recipeService.getRecipeById(this.recipeID).subscribe(recipe =>{
          if(recipe.results.title != request['title']){
              body.title = request['title'];
          }
          if(recipe.results.image  != request['imgURL']){
              body.image = request['imgURL'];
          }
          if(recipe.results.description != request['description']){
              body.description = request['description'];
          }
          if(!this.arraysAreEqual(this.ingredients, recipe.results.ingredients)){
            var newIngredients:any = this.ingredients.map(function(a:any) { return a["id"]; });
            body.ingredients = newIngredients;
          }
          if(recipe.results.steps!= request['process']){
              body.steps = request['process'];
          }
          this.removeEmptyValues(body)
          this.recipeService.putRecipeById(this.recipeID, token, body).subscribe(recipeUpdate =>{
            if(recipeUpdate.code == 200){
              Swal.fire("CORRECTO", 'Receta editada', 'success').then(()=>{
                this.router.navigate(['recipes/' + this.recipeID]).then(() => {
                  window.location.reload();
                });
              })
            }else{
              Swal.fire("ERROR", recipeUpdate.message, 'error').then(()=>{
                this.router.navigate(['recipes/' + this.recipeID]).then(() => {
                  window.location.reload();
                });
              })
            }
          })

        })
      }
    })
  }

  arraysAreEqual(array1: any, array2: any) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  /**
   * Método lanzado en la inicialización de la página.
   * Asigna los valores obtenidos del servicio de recetas a las áreas de texto correspondientes.
   */
  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID!).subscribe(recipe => {
      this.description = recipe?.results.description;
      this.title = recipe?.results.title;
      this.ingredients = recipe?.results.ingredients;
      this.imgURL = recipe?.results.image;
      this.process = recipe?.results.steps;
      this.author = recipe?.results.user.username
      this.recipeForm.setValue({
        title: recipe?.results.title,
        imgURL: recipe?.results.image,
        process: recipe?.results.steps,
        description: recipe?.results.description,
        author: recipe?.results.user.username
      });
    });
  }

  removeEmptyValues(object: any) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var value = object[key];
            if (value === null || value === undefined || value === '') {
                delete object[key];
            }
        }
    }
}

}
