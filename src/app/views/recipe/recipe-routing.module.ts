import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';


const routes: Routes = [
  {path: '', component: EditorComponent},
  {path: ':id', component: EditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }