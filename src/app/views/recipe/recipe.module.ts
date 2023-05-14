import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { EditorComponent } from './pages/editor/editor.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditorComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class RecipeModule { }
