import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { FrontImageComponent } from './components/front-image/front-image.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListProductsComponent,
    ListProductsComponent,
    FrontImageComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
  ]
})
export class WelcomeModule { }
