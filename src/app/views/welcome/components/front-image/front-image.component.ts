import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
/**
 * Clase que representa la parte superior del home.
 */
@Component({
  selector: 'app-front-image',
  templateUrl: './front-image.component.html',
  styleUrls: ['./front-image.component.scss']
})
export class FrontImageComponent implements OnInit {

  /**
   * @constructor
   * @param {Router} router : Navegación de rutas.
   * @param {RecipesService} recipeService : Servicio de recetas.
   */
  constructor(private router: Router, private recipeService: RecipesService) { }

  /**
   * @override
   */
  ngOnInit(): void {
  }

  /**
   * Metodo para enviar al usuario a una receta random.
   */
  goToRandomRecipe() {
    this.recipeService.randomRecipe().subscribe(recipe =>{
      this.router.navigate(['recipes/' + recipe.results.id]);
    })
  }

}
