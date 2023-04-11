import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FavListComponent } from './components/fav-list/fav-list.component';
import { MyRecipesListComponent } from './components/my-recipes-list/my-recipes-list.component';


@NgModule({
  declarations: [
    ProfileComponent,
    FavListComponent,
    MyRecipesListComponent,
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserInfoModule { }
