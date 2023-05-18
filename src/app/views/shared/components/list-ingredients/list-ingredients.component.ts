import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
/**
 * Clase para el listado para la paginación de los ingredientes.
 */
@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.scss']
})
export class ListIngredientsComponent implements OnInit {
  @Input() ingredients: Ingredient[] = [];
  @Input() isPanel:string = ""

  /**
   * @constructor
   * @param {IngredientsService} ingredientService : Servicio de ingredientes.
   * @param {CookieService} cookieService : Servicio de cookies.
   * @param {Router} router : Navegación de rutas.
   */
  constructor(private ingredientService: IngredientsService, private cookieService: CookieService, private router: Router) { }

  /**
   * @override
   */
  ngOnInit(): void {
  }

  /**
   * Método para eliminar un ingrediente.
   * @param {number} id : id del ingrediente
   */
  deleteIngredient(id: number){
  var token = this.cookieService.get('Token');
  this.ingredientService.deleteIngredient(token,id).subscribe(data => {
    if(data.message == "OK"){
      Swal.fire("CORRECTO", 'Ingrediente eliminado', 'success').then(()=>{
        this.router.navigate(['panel']).then(() => {
          window.location.reload();
        });
      })
    }else{
      Swal.fire("ERROR", data.message, 'error').then(()=>{
        this.router.navigate(['panel']).then(() => {
          window.location.reload();
        });
      })
    }
  })
  }
}
