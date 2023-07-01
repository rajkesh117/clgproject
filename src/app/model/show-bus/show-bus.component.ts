import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { searchBus } from 'src/app/Classes/Book_Bus_classes';
import { bookBusService } from 'src/app/services/bookBusService';
import { bookingdatatransferService } from 'src/app/services/bookingdatatransferService';

@Component({
  selector: 'app-show-bus',
  templateUrl: './show-bus.component.html',
  styleUrls: ['./show-bus.component.css']
})
export class ShowBusComponent implements OnInit {

  data: any;
  forms: any;
  startCity: any;
  endCity: any;
  date: any;
  constructor(private spinner: NgxSpinnerService, private bookBus: bookBusService,
    private router: Router, private datePipe: DatePipe,private datatransfer : bookingdatatransferService) { }

  ngOnInit(): void {
    this.getAvailableBus()
    this.form();
  }

  getAvailableBus() {
    let availableBus = localStorage.getItem('availableBuses');
    this.data = JSON.parse(availableBus || "");
    this.data.startTime = new Date(this.data.startTime);
    this.startCity = this.data[0].startCity;
    this.endCity = this.data[0].destinationCity;
    this.date = this.datePipe.transform(this.data[0].startDate, 'yyyy-MM-dd');
    console.log(this.data)
  }
  newdate(date: any) {
    return new Date(date);
  }
  form() {
    this.forms = new FormGroup({
      startCity: new FormControl(this.startCity, Validators.required),
      endCity: new FormControl(this.endCity, Validators.required),
      journeyDate: new FormControl(this.date, Validators.required),
    })
  }
  mapping() {
    var form = new searchBus();
    form.startCity = this.forms.value.startCity;
    form.endCity = this.forms.value.endCity;
    form.journeyDate = this.forms.value.journeyDate;
    return form;
  }

  search() {
    if (!this.forms.valid) {
      window.alert("Please fill Required Fields");
      return;
    }
    let searchData = this.mapping();
    this.spinner.show();
    this.bookBus.getAvailableBuses(searchData).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          localStorage.removeItem('availableBuses')
          res.startTime = new Date(res.startTime);
          let data = JSON.stringify(res);
          localStorage.setItem('availableBuses', data);
          this.getAvailableBus();
        }
        else {
          window.alert("Bus not found for this date or city");
        }
      },
      (error) => {
        this.spinner.hide();
        window.alert("Somthing went wrong");
      }
    )
  }

  Book(event: any){
    this.datatransfer.SendData(event);
    this.router.navigate(['/bookticket']);
  }

}
