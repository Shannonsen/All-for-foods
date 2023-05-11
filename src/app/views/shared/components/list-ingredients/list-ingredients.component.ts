import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.scss']
})
export class ListIngredientsComponent implements OnInit {
  @Input() ingredients: Ingredient[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  deleteIngredient(id: number){

  }
}
