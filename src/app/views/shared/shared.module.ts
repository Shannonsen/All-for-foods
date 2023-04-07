import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { SearcherRecipeComponent } from './components/searcher-recipe/searcher-recipe.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavmenuComponent,
    SearcherRecipeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavmenuComponent,
    SearcherRecipeComponent,
    FormsModule,
  ]
})
export class SharedModule { }
