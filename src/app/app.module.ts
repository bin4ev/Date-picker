import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';

import { DatePickerComponent } from './datePicker/datePicker.component';
@NgModule({
  declarations: [
    AppComponent,
    MonthCalendarComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
