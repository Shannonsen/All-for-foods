import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeViewComponent } from './pages/recipe-view.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';


@NgModule({
  declarations: [
    RecipeViewComponent,
    CommentSectionComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule { }
