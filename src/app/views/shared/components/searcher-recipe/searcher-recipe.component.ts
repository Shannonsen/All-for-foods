import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"

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

  changeSearch(){
    console.log("Todo");
  }

  onClick() {
    var title = $("#title").is(":checked");
    if(title){
      console.log("title is selected");
    }else{
      console.log("title is not selected");
    }
  }
}
