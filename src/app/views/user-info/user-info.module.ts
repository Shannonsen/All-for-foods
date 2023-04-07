import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserInfoModule { }
