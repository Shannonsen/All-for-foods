import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  products: Food[] = []
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  typeSearch: string = "";
  isPanel: string = "";
  constructor(private recipeService: RecipesService, private cookieService: CookieService) { }

  ngOnInit(): void {
    var token = this.cookieService.get('Token');
    console.log(token);
    this.recipeService.getAllRecipesActivated(token, 1).subscribe(data =>{
      console.log(data)
      this.products = data.data
    })
  }

}
