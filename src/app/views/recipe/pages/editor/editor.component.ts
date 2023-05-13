import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/views/shared/models/user.model';
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
  ingredients: string[] | undefined = [];
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
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private recipeService: RecipesService, private userService: UserService) {
    this.recipeForm = this.formBuilder.group({});
  }

  /**
   * @override
   */
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
        this.author = user!.username;
      })

      this.recipeForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        ingredients: new FormControl('', [Validators.required, Validators.minLength(4)]),
        imgURL: new FormControl('', [Validators.required, Validators.minLength(4)]),
        process: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', [Validators.required, Validators.minLength(4)]),
        author: new FormControl(''),
      });
    });
  }

  /**
   * Método lanzado cuando se oprime el botón Save.
   */
  onSave() {
    if (Number.isNaN(this.recipeID)) {
      this.recipeID = 0;
      this.recipeService.getFoodCount().subscribe(count => {
        this.recipeID = count + 1;

        //creation date == last modified == modification date
        alert('receta actualizada\nid:' + this.recipeID);
      });
    } else {
      //last modified == modification date
      alert('receta actualizada\nid:' + this.recipeID);
    }
  }

  /**
   * Método lanzado en la inicialización de la página.
   * Asigna los valores obtenidos del servicio de recetas a las áreas de texto correspondientes.
   */
  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID!).subscribe(recipe => {
      this.description = recipe?.results.description;
      this.title = recipe?.results.title;
      this.ingredients = recipe?.resultsingredients;
      this.imgURL = recipe?.results.image;
      this.process = recipe?.results.steps;
      this.author = recipe?.results.user.username
      if(recipe?.rate!= undefined){
        for(let i =0; i<5; i++){
          if(i<recipe?.rate){
            const star = document.getElementById(String("star-" + i + "-" + this.recipeID))!;
            star.style.color = "gold";
          }
        }
      }
    });
  }

  changeRating(idStar: number, idProduct: number | undefined) {

    const star = document.getElementById(String("star-" + idStar + "-" + idProduct))!;
    if (star.style.color == "gold") {
      star.style.color = "gray";
      star.style.scale = "1";
    } else {
      star.style.color = "gold";
      star.style.scale = "1.2";
    }

  }

}
