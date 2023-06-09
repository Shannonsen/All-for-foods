import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
/**
 * Clase que representa el listado de recetas paginado.
 */
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  @Input() products: Food[] = [];
  token: any = "";
  user: any = ""
  @Input() isPanel: string = ""
  favoriteRecipes: Food[] = [];
  color: string = ""

  /**
   * @constructor
   * @param {CookieService} cookieService : Servicio de cookies.
   * @param {RecipesService} recipeService : Servicio de recetas.
   * @param {Router} router : Navegación de rutas.
   */
  constructor(private cookieService: CookieService, private recipeService: RecipesService, private router: Router) { }

  /**
   * @override
   */
  ngOnInit(): void {
    this.token = this.cookieService.get('Token');
    this.user = this.cookieService.get('idUser');
    this.recipeService.getAllMyFavoritesRecipes(Number(this.user)).subscribe(recipesFavorites => {
      this.favoriteRecipes = recipesFavorites.data
    })
  }

  /**
   * Verificar que una receta es favorita por el usuario logueado.
   * @param {number} id : id de la receta
   * @returns true si la receta se encuentra en sus recetas favoritas, false si no es asi.
   */
  verifyFollowed(id: number) {
    var idRecipeFavorites: any = this.favoriteRecipes.map(function (a: any) { return a["id"]; });
    return idRecipeFavorites.includes(id);
  }

  /**
   * Método para redondear el rating.
   * @param {any} rate : score.
   * @returns score redondeado.
   */
  round(rate: any) {
    return Math.round(rate)
  }

  /**
   * Método que se encarga de cambiar el color del elemento <i> cuando es clickeado.
   * El elemento es obtenido a través de un id.
   * @param {number} id : id del elemento <i>
   */
  changeColor(id: number) {
    const heart = document.getElementById(String(id))!;
    if (heart.style.color == "red") {
      heart.style.color = "gray";
      heart.style.scale = "1";
      this.recipeService.deleteFavorite(id, Number(this.user), this.token).subscribe(response => {
      })
    } else {
      heart.style.color = "red";
      heart.style.scale = "1.2";
      this.recipeService.postFavorite(id, Number(this.user), this.token).subscribe(response => {
      })
    }
  }

  /**
   * Método para eliminar una receta.
   * @param {number} id : id de receta.
   */
  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id, this.token).subscribe(response => {
      if (response.message == "OK") {
        Swal.fire("CORRECTO", 'Receta eliminada', 'success').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      } else {
        Swal.fire("ERROR", response.message, 'error').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

  /**
   * Método para activar una receta.
   * @param {number} id : id de receta.
   */
  activateRecipe(id: number) {
    this.recipeService.activeRecipe(id, this.token).subscribe(response => {
      if (response.message == "OK") {
        Swal.fire("CORRECTO", 'Receta activada', 'success').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      } else {
        Swal.fire("ERROR", response.message, 'error').then(() => {
          this.router.navigate(['panel']).then(() => {
            window.location.reload();
          });
        })
      }
    })
  }

}
