import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { addTrip } from 'src/app/Classes/Book_Bus_classes';
import { adminService } from 'src/app/services/adminService';

@Component({
  selector: 'app-add-edit-trip-dialouge',
  templateUrl: './add-edit-trip-dialouge.component.html',
  styleUrls: ['./add-edit-trip-dialouge.component.css']
})
export class AddEditTripDialougeComponent implements OnInit {

  public forms: any;
  constructor(private adminService: adminService, public dialogRef: MatDialogRef<AddEditTripDialougeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.data.status == 1) {
      this.form();
    }
    else {
      this.formedit();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  form() {
    this.forms = new FormGroup({
      tripName: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      noOfSeats: new FormControl('', Validators.required),
      startCity: new FormControl('', Validators.required),
      destinationCity: new FormControl('', Validators.required),
      fair: new FormControl('', Validators.required),
    })
  }
  formedit() {
    this.forms = new FormGroup({
      tripName: new FormControl(this.data.form.tripName, Validators.required),
      startDate: new FormControl(new Date(this.data.form.startDate), Validators.required),
      endDate: new FormControl(new Date(this.data.form.endDate), Validators.required),
      noOfSeats: new FormControl(this.data.form.noOfSeats, Validators.required),
      startCity: new FormControl(this.data.form.startCity, Validators.required),
      destinationCity: new FormControl(this.data.form.destinationCity, Validators.required),
      fair: new FormControl(this.data.form.fair, Validators.required),
    })
  }

  mapping() {
    let tripdata = new addTrip();
    if (this.data.form) {
      tripdata._id = this.data.form._id;
    }
    else {
      tripdata._id = "";
    }
    tripdata.adminEmail = localStorage.getItem('username') || "";
    tripdata.tripName = this.forms.value.tripName;
    tripdata.startDate = this.forms.value.startDate;
    tripdata.endDate = this.forms.value.endDate;
    tripdata.startCity = this.forms.value.startCity;
    tripdata.destinationCity = this.forms.value.destinationCity;
    tripdata.fair = this.forms.value.fair;
    tripdata.noOfSeats = this.forms.value.noOfSeats;
    tripdata.isDeleted = false;
    tripdata.numberOfTrips = [];
    return tripdata;
  }

  EditData() {
    if (!this.forms.valid) {
      window.alert("Please fill Required Fields");
      return;
    }
    this.spinner.show();
    let registerdata = this.mapping();
    if (confirm("Are you sure you want to Delete") == true) {

      this.spinner.show();
      this.adminService.addTripData(registerdata).subscribe(
        (res) => {
          this.spinner.hide();
          if (res) {
            window.alert("Edited Successfull");
            this.onCancel()
          }
        },
        (error) => {
          this.spinner.hide();
          window.alert("Somthing went wrong");
        }
      )
    } else {
      this.spinner.hide();
      return;
    }
  }

  addTrip() {
    if (!this.forms.valid) {
      window.alert("Please fill Required Fields");
      return;
    }
    this.spinner.show();
    let registerdata = this.mapping();
    this.adminService.addTripData(registerdata).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.result) {
          this.onCancel();
        }
        else {
          window.alert("Somthing went wrong data not added");
        }
      },
      (error) => {
        window.alert("Somthing went wrong");
      }
    )
  }
}
