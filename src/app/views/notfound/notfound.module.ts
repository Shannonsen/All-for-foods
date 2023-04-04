import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundRoutingModule } from './notfound-routing.module';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PagenotfoundComponent,
  ],
  imports: [
    CommonModule,
    NotfoundRoutingModule,
    SharedModule,
  ]
})
export class NotfoundModule { }
