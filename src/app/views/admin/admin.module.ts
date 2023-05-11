import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PanelComponent,
    TableComponent,
    AddIngredientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
