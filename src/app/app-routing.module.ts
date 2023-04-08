import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home', loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'profile', loadChildren: () => import('./views/user-info/user-info.module').then(m => m.UserInfoModule)
  },
  {
    path: 'register', loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'recipe', loadChildren: () => import('./views/recipe/recipe.module').then(m => m.RecipeModule)
  },
  {
    path: 'support', loadChildren: () => import('./views/support/support.module').then(m => m.SupportModule)
  },
  {
    path: '**', loadChildren: () => import('./views/notfound/notfound.module').then(m => m.NotfoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
