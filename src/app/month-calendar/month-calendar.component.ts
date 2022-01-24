import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const MS_IN_DAY = 100 * 60 * 60 * 24

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css']
})
export class MonthCalendarComponent implements OnInit {
  @ViewChild('div') divEl!: ElementRef

  @Output() sentCurrDate = new EventEmitter()
  @Input() show = false

  iconLeft = faCaretLeft
  iconRight = faCaretRight

  d = new Date()
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  today = this.d.getDate()
  currYear = this.d.getFullYear()
  currMonthIndex = this.d.getMonth()
  currMonth = this.months[this.currMonthIndex];
  StartMouth = this.months[this.currMonthIndex];
  firstDay = new Date(this.d.getFullYear(), this.d.getMonth(), 1);
  lastDayOfMonth = new Date(this.d.getFullYear(), this.d.getMonth() + 1, 0);
  firstDayWeek = this.weekdays[this.firstDay.getDay()]

  AllMoth: any = []
  dates: any = []
  selectedEl!: any
  daysForMonth!: number
  pressedNext!: boolean
  disable = true
  matchDate = true

  ngOnInit(): void {
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.setViewDates(this.firstDay)
  }

  checkDateIsAfter(date: number): boolean {
    let now = new Date()
    return this.currYear < this.d.getFullYear() ||
      this.currMonthIndex < this.d.getMonth() ||
      this.currMonthIndex == this.d.getMonth() &&
      date <= now.getDate()
  }

  onSelect(e: any) {
    if (this.checkDateIsAfter(e.target.textContent)) {
      return
    }

    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }
    e.target.parentElement.classList.add('selected')
    this.selectedEl = e.target.parentElement
    let date = e.target.textContent
    this.show = false
    let {currMonth,currYear} = this
    this.sentCurrDate.emit({date, currMonth, currYear})
  }

  changeMonth() {
    this.pressedNext ? this.currMonthIndex++ : this.currMonthIndex--
    if (this.currMonthIndex < 0) {
      this.currMonthIndex = 11
      this.currYear--
    }
    if (this.currMonthIndex > 11) {
      this.currYear++
    }
    this.daysForMonth = this.getdaysFromMouths(this.currMonthIndex)
    this.currMonth = this.months[this.currMonthIndex % this.months.length]
  }

  next() {
    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }
    this.matchDate = false
    this.pressedNext = true
    this.changeMonth()
    this.setViewDates(this.firstDay)
  }

  previous() {
    if (this.currMonth == this.StartMouth) {
      this.matchDate = true
      return
    }

    if (this.selectedEl) {
      this.selectedEl.classList.remove('selected')
    }

    this.matchDate = false
    this.pressedNext = false
    this.changeMonth()
    this.firstDay = new Date(this.currYear, this.currMonthIndex, 1);
    this.setViewDates(this.firstDay)
  }

  setViewDates(d: Date) {
    let start = d.getDay()
    let dates = []
    for (let i = start, j = 0; j < this.daysForMonth; i++, j++) {
      dates[i] = d.getDate()
      d.setDate(d.getDate() + 1)
    }
    this.dates = dates
  }

  getLastSunday(year: any, month: any) {
    let d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  isToday(date: Number) {
    let d = new Date
    return date == d.getDate() &&
      this.currMonth == this.months[this.d.getMonth()] &&
      this.currYear == this.d.getFullYear()
  }

  isDateBefore(date:Number) {
    let d = new Date
    return date < d.getDate() &&
      this.currMonth == this.months[this.d.getMonth()] &&
      this.currYear == this.d.getFullYear()
  }

  getdaysFromMouths(month: any) {
    let daysFromMouths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return daysFromMouths[month]
  }

}
