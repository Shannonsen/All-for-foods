import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { SearcherRecipeComponent } from './components/searcher-recipe/searcher-recipe.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    NavmenuComponent,
    SearcherRecipeComponent,
    ListProductsComponent,
    SearcherRecipeComponent,
    TagInputComponent
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
    SearcherRecipeComponent
  ]
})
export class SharedModule { }
