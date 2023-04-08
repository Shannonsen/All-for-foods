import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { SearcherRecipeComponent } from './components/searcher-recipe/searcher-recipe.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './components/list-products/list-products.component';


@NgModule({
  declarations: [
    NavmenuComponent,
    SearcherRecipeComponent,
    ListProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavmenuComponent,
    SearcherRecipeComponent,
    FormsModule,
    ListProductsComponent,
  ]
})
export class SharedModule { }
