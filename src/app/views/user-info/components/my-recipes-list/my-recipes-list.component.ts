import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrls: ['./my-recipes-list.component.scss']
})
export class MyRecipesListComponent implements OnInit {
  @Input() myRecipes: number[] = []
  myRecipesList: Food[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number[] = [];


  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.myRecipesList = (recipes as Food[]).filter(p => this.myRecipes.includes(p.id));
    })    
    const pageCount = Math.ceil(this.myRecipes.length / this.pageSize);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  loadPage(pageNumber: number): Food[] {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize
    return this.myRecipesList.slice(startIndex, endIndex);
  }
}
