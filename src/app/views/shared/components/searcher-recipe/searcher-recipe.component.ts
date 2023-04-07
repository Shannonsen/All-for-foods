import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher-recipe',
  templateUrl: './searcher-recipe.component.html',
  styleUrls: ['./searcher-recipe.component.scss']
})
export class SearcherRecipeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onEnter() {
    console.log("Enter");
  }

}
