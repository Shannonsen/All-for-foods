import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavmenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavmenuComponent,
    FormsModule,
  ]
})
export class SharedModule { }
