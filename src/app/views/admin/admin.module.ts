import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PanelComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
