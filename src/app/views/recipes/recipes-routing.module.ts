import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeViewComponent } from './pages/recipe-view.component';

const routes: Routes = [
  {path: '', component: RecipeViewComponent},
  {path: ':id', component: RecipeViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
