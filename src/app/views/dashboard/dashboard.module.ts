import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { ListFollowsComponent } from './components/list-follows/list-follows.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesFollowsListComponent } from './components/recipes-follows-list/recipes-follows-list.component';


@NgModule({
  declarations: [
    BoardComponent,
    ListFollowsComponent,
    RecipesFollowsListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
