import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.scss']
})
export class ListIngredientsComponent implements OnInit {
  @Input() ingredients: Ingredient[] = [];
  @Input() isPanel:string = ""
  constructor(private ingredientService: IngredientsService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

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
