import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'panel', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'profile', loadChildren: () => import('./views/user-info/user-info.module').then(m => m.UserInfoModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'register', loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'recipe', loadChildren: () => import('./views/recipe/recipe.module').then(m => m.RecipeModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'support', loadChildren: () => import('./views/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'recipes', loadChildren: () => import('./views/recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'search', loadChildren: () => import('./views/search/search.module').then(m => m.SearchModule)
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
