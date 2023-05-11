import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent implements OnInit {

  ingredientForm: FormGroup;
  constructor(fb: FormBuilder, private ingredientService: IngredientsService, private cookieService: CookieService, private router: Router) {
    this.ingredientForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      ingredient: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  onSubmit() {
    var token = this.cookieService.get('Token');
    var request = this.ingredientForm.value;
   this.ingredientService.addIngredient(token, request['ingredient']).subscribe(data =>{
    if(data.message == "Created"){
      Swal.fire("CORRECTO", 'Ingrediente creado', 'success').then(()=>{
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
