import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { MailComponent } from './pages/mail/mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MailComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SupportModule { }
