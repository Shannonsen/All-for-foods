import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeViewComponent } from './pages/recipe-view.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { ListCommentsPaginationComponent } from './components/list-comments-pagination/list-comments-pagination.component';


@NgModule({
  declarations: [
    RecipeViewComponent,
    CommentSectionComponent,
    ListCommentsPaginationComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class RecipesModule { }
