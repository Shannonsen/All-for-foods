import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { Ingredient } from '../../shared/models/ingredient.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  @Input() recipes: Food[] = [];

  recipeID: number = 0;
  title: string | undefined = '';
  author: string = "";
  ingredients: Ingredient[] = [];
  imgURL: string | undefined = '';
  process: string| undefined = "";
  description: string | undefined = '';
  rating: number = 0;
  rating_round: number = 0;
  date: string | null = "";
  myScore: number = 0;
  changeScore: string =""
  newScoreCount: number = 0;
  token: string =""

  recipeForm: FormGroup;

  displayButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private recipeService: RecipesService, private UserService: UserService, private cookieService: CookieService, private pipe: DatePipe, private router: Router) {
    this.recipeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.token = this.cookieService.get('Token');
    var token = this.cookieService.get('Token');
    var idUser = this.cookieService.get('idUser');
    this.route.params.subscribe(params => {
      this.recipeID = Number(params['id']);
      if (!Number.isNaN(this.recipeID)) {
        this.updateRecipeInformation();
      }
      this.recipeService.getMyScore(token, Number(idUser), this.recipeID).subscribe(myScore =>{
        if(myScore.results.score){
          this.changeScore = String(myScore.results.score)
        }
        this.myScore = Math.round(myScore.results.score)
      })

    });
    this.displayEditButton();
  }

  changeMyScore(){
    var token = this.cookieService.get('Token');
    var idUser = this.cookieService.get('idUser');
    if(this.changeScore){
      this.changeScore = ""
      this.recipeService.deleteMyScore(token, Number(idUser), this.recipeID).subscribe(response =>{
        if(response.message == "OK"){
          Swal.fire("CORRECTO", 'Score eliminado', 'success')
        }else{
          Swal.fire("ERROR", response.message, 'error')
        }
      })
    }else{
      this.recipeService.postMyScore(token, Number(idUser), this.recipeID,this.newScoreCount).subscribe(response =>{
        if(response.code == "201"){
          Swal.fire("CORRECTO", 'Score modificado', 'success').then(()=>{
            this.router.navigate(['recipes/' + this.recipeID]).then(() => {
              window.location.reload();
            });
          })
        }else{
          Swal.fire("ERROR", response.message, 'error')
        }
      })
    }
  }

  updateRecipeInformation() {
    this.recipeService.getRecipeById(this.recipeID).subscribe((recipe) => {
      var recipeResult = recipe?.results as Food
      this.author = recipeResult.user.username;
      this.description = recipeResult.description
      this.title = recipeResult.title;
      this.ingredients = recipe?.results.ingredients;
      this.imgURL = recipeResult.image;
      this.process = recipeResult.steps;
      this.rating = recipeResult.rate;
      this.rating_round = Math.round(recipeResult.rate);
      this.date = this.pipe.transform(recipeResult.createdAt, 'yyyy-MM-dd');
    })
  }

  changeRating(idStar: number, idProduct: number | undefined) {
    const star = document.getElementById(String("star-" + idStar + "-" + idProduct + "-" + idProduct))!;
    console.log(star.style.color)
    if (star.style.color == "gold") {
      star.style.color = "gray";
      star.style.scale = "1";
      this.newScoreCount--
    } else {
      star.style.color = "gold";
      star.style.scale = "1.2";
      this.newScoreCount++
    }

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
