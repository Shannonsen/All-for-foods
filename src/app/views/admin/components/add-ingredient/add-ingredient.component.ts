import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent implements OnInit {

  ingredientForm: FormGroup;
  constructor(fb: FormBuilder, private ingredientService: IngredientsService, private cookieService: CookieService) {
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
    console.log("Ingrediente: " + request['ingredient'])
   this.ingredientService.addIngredient(token, request['ingredient']).subscribe(data =>{
    console.log(data)
   })
  }

}
