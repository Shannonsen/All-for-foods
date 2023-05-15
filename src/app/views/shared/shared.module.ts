import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { SearcherRecipeComponent } from './components/searcher-recipe/searcher-recipe.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { TagInputModule } from 'ngx-chips';
import { PaginationItemsComponent } from './components/pagination-items/pagination-items.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListIngredientsComponent } from './components/list-ingredients/list-ingredients.component';
import { ListCommentsComponent } from './components/list-comments/list-comments.component';


@NgModule({
  declarations: [
    NavmenuComponent,
    SearcherRecipeComponent,
    ListProductsComponent,
    TagInputComponent,
    SearcherRecipeComponent,
    TagInputComponent,
    PaginationItemsComponent,
    ListUsersComponent,
    ListIngredientsComponent,
    ListCommentsComponent,
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
    PaginationItemsComponent,
    ListUsersComponent,
    ListIngredientsComponent,
  ]
})
export class SharedModule { }
