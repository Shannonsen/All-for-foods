import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { SearcherRecipeComponent } from './components/searcher-recipe/searcher-recipe.component';
import { RouterModule } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { TagInputModule } from 'ngx-chips';
import { PaginationItemsComponent } from './components/pagination-items/pagination-items.component';


@NgModule({
  declarations: [
    NavmenuComponent,
    SearcherRecipeComponent,
    ListProductsComponent,
    SearcherRecipeComponent,
    TagInputComponent,
    PaginationItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AutocompleteLibModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavmenuComponent,
    SearcherRecipeComponent,
    FormsModule,
    ListProductsComponent,
    SearcherRecipeComponent,
    PaginationItemsComponent
  ]
})
export class SharedModule { }
