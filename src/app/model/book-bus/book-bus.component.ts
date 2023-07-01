import { DatePipe } from '@angular/common';
import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { bookBusService } from 'src/app/services/bookBusService';
import { bookingdatatransferService } from 'src/app/services/bookingdatatransferService';
import { MakepaymentComponent } from '../dialouges/makepayment/makepayment.component';
import { busTicket, passenger } from 'src/app/Classes/Book_Bus_classes';

@Component({
  selector: 'app-book-bus',
  templateUrl: './book-bus.component.html',
  styleUrls: ['./book-bus.component.css']
})
export class BookBusComponent implements OnInit {

  bookingData: any;
  forms: any;
  showbutton = true;
  person = 1;
  passenger: any;
  bookPassengeslist: any;
  gender = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
    { value: 'Others', viewValue: 'Others' },
  ];
  constructor(private spinner: NgxSpinnerService, private bookBus: bookBusService,
    private router: Router, private datePipe: DatePipe, private datatransfer: bookingdatatransferService, private location: Location, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookingData = this.datatransfer.Getdata();
    if (!this.bookingData) {
      this.back();
      return;
    }
    // this.addPerson(2)
    this.form();
  }

  back() {
    this.location.back();
  }

  addPerson(status: any) {
    if (status == 1 && this.person != 3) {
      this.person = this.person + 1;
    }
    else {
      if (this.person != 1) {
        this.person = this.person - 1;
      }
    }
  }
  form() {
    this.forms = new FormGroup({
      address: new FormControl('', Validators.required),
      aadharno: new FormControl('', Validators.required),
      mobileno: new FormControl('', Validators.required),
      name1: new FormControl('', Validators.required),
      age1: new FormControl('', Validators.required),
      name2: new FormControl('', Validators.required),
      age2: new FormControl('', Validators.required),
      name3: new FormControl('', Validators.required),
      age3: new FormControl('', Validators.required),
      gender1: new FormControl('', Validators.required),
      gender2: new FormControl('', Validators.required),
      gender3: new FormControl('', Validators.required),
    })
  }

  validation() {
    if (this.person == 1) {
      if (this.forms.value.name1 &&
        this.forms.value.age1 &&
        this.forms.value.gender1 &&
        this.forms.value.address &&
        this.forms.value.aadharno &&
        this.forms.value.mobileno
      ) {

        // let persondata = new busTicket();
        let persondata = [
          {
            ticketId: '',
            name: this.forms.value.name1,
            age: this.forms.value.age1,
            gender: this.forms.value.gender1,
            seatNo: ''
          }
        ]
        this.passenger = persondata;
        return true;
      }
      else {
        return false;
      }
    }
    else if (this.person == 2) {
      if (this.forms.value.name1 &&
        this.forms.value.age1 &&
        this.forms.value.gender1 &&
        this.forms.value.address &&
        this.forms.value.aadharno &&
        this.forms.value.mobileno &&
        this.forms.value.name2 &&
        this.forms.value.age2 &&
        this.forms.value.gender2
      ) {

        let persondata = [
          {
            ticketId: '',
            name: this.forms.value.name1,
            age: this.forms.value.age1,
            gender: this.forms.value.gender1,
            seatNo: ''
          },
          {
            ticketId: '',
            name: this.forms.value.name2,
            age: this.forms.value.age2,
            gender: this.forms.value.gender2,
            seatNo: ''
          }
        ]
        this.passenger = persondata;
        return true;
      }
      else {
        return false;
      }
    } else if (this.person == 3) {
      if (this.forms.value.name1 &&
        this.forms.value.age1 &&
        this.forms.value.gender1 &&
        this.forms.value.address &&
        this.forms.value.aadharno &&
        this.forms.value.mobileno &&
        this.forms.value.name2 &&
        this.forms.value.age2 &&
        this.forms.value.gender2 &&
        this.forms.value.name3 &&
        this.forms.value.age3 &&
        this.forms.value.gender3
      ) {

        let persondata = [
          {
            ticketId: '',
            name: this.forms.value.name1,
            age: this.forms.value.age1,
            gender: this.forms.value.gender1,
            seatNo: ''
          },
          {
            ticketId: '',
            name: this.forms.value.name2,
            age: this.forms.value.age2,
            gender: this.forms.value.gender2,
            seatNo: ''
          },
          {
            ticketId: '',
            name: this.forms.value.name3,
            age: this.forms.value.age3,
            gender: this.forms.value.gender3,
            seatNo: ''
          }
        ]
        this.passenger = persondata;
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  }
  openDialog(tripdata: any): void {
    let username = localStorage.getItem('username');
    let dialogRef = this.dialog.open(MakepaymentComponent, {
      width: '900px',
      data: tripdata,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  mapping() {
    let ticketCharges = this.passenger.length * parseInt(this.bookingData.fair);
    let bookTicket = new busTicket();
    bookTicket._id = "";
    bookTicket.busId = this.bookingData.busId;
    bookTicket.bookedBy = localStorage.getItem('username') || "";
    bookTicket.busName = this.bookingData.busName
    bookTicket.bookedDate = this.bookingData.startDate;
    bookTicket.startCity = this.bookingData.startCity
    bookTicket.destinationCity = this.bookingData.destinationCity
    bookTicket.fairPaid = ticketCharges.toString();
    bookTicket.contactNo = this.forms.value.mobileno;
    bookTicket.aadharNo = this.forms.value.aadharno;
    bookTicket.address = this.forms.value.address;
    bookTicket.isCancelled = false;
    bookTicket.bordingTime = this.datePipe.transform(this.bookingData.startTime,"hh:mm a")?.toString();
    bookTicket.passengers = this.passenger;
    return bookTicket;
  }

  makePayment() {
    let validation = this.validation();
    if (!validation) {
      window.alert("Please fill the required fields");
      return;
    }
    let form = this.mapping();
    this.openDialog(form);
    // this.bookBus.bookBus(form).subscribe(
    //   (res) => {
    //     if (res) {
    //       console.log(res);
    //     }
    //   },
    //   (error) => {
    //     window.alert("Somthing went wrong");
    //   }
    // )

  }

}
