import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { ListFollowsComponent } from './components/list-follows/list-follows.component';


@NgModule({
  declarations: [
    BoardComponent,
    ListFollowsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
