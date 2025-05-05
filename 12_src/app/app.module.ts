import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ IMPORT THIS

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // ✅ INCLUDE THIS IN imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
