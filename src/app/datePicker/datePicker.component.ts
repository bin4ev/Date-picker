import { Component, ViewChild, OnInit, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MonthCalendarComponent } from '../month-calendar/month-calendar.component';

@Component({
  selector: 'datePicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.css']
})
export class DatePickerComponent {
  @ViewChild('dinamic', { read: ViewContainerRef })

  dinamic!: ViewContainerRef

  @Input() value!: string

  fullDate!: string
  calendar!: any

  constructor(private resolver: ComponentFactoryResolver) { }

  onFocus() {
    this.calendar = this.dinamic.createComponent(MonthCalendarComponent)
    this.calendar.instance.show = true
    this.calendar.instance.sentCurrDate.subscribe((data: any) => {
      this.calendar.destroy()
      let { date, currMonth, currYear } = data
      this.fullDate = `${currMonth} ${date},${currYear}`
    })
  }
}
