import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { RecipeAuthGuard } from 'src/app/guards/recipe-auth.guard';


const routes: Routes = [
  {path: '', component: EditorComponent},
  {path: ':id', component: EditorComponent ,canActivate: [RecipeAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
