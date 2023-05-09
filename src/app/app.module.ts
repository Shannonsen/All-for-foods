import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './views/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { TagInputComponent } from './views/shared/components/tag-input/tag-input.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [TagInputComponent,
  CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
