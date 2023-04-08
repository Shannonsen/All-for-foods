import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { EditorComponent } from './pages/editor/editor.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './component/comment/comment.component';



@NgModule({
  declarations: [
    EditorComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class RecipeModule { }
