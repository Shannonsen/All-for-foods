import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {
  @Input() favorites: number[] = []
  favs: Food[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number[] = [];
  sectionName: string = 'Mis Favoritos';


  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.getAllFoods().subscribe(recipes => {
      this.favs = (recipes as Food[]).filter(p => this.favorites.includes(p.id));

      
    const pageCount = Math.ceil(this.favorites.length / this.pageSize);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
    })    
  }

  loadPage(pageNumber: number): Food[] {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize
    return this.favs.slice(startIndex, endIndex);
  }
}

