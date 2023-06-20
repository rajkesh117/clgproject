import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addTrip } from 'src/app/Classes/Book_Bus_classes';
import { adminService } from 'src/app/services/adminService';

@Component({
  selector: 'app-add-edit-trip-dialouge',
  templateUrl: './add-edit-trip-dialouge.component.html',
  styleUrls: ['./add-edit-trip-dialouge.component.css']
})
export class AddEditTripDialougeComponent implements OnInit {

  public forms: any;
  constructor(private adminService : adminService) { }

  ngOnInit(): void {
    this.form();
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

  mapping(){
    let tripdata = new addTrip();
    tripdata._id = "";
    tripdata.admin_emailId = localStorage.getItem('username') || "";
    tripdata.tripName = this.forms.value.tripName;
    tripdata.startDate = this.forms.value.startDate;
    tripdata.endDate = this.forms.value.endDate;
    tripdata.startCity = this.forms.value.startCity;
    tripdata.destinationCity = this.forms.value.destinationCity;
    tripdata.fair = this.forms.value.fair;
    tripdata.noOfSeats = this.forms.value.noOfSeats;
    tripdata.isDeleted = false;
    return tripdata;
  }

  addTrip() {
    if (!this.forms.valid) {
      window.alert("Please fill Required Fields");
      return;
    }
    let registerdata = this.mapping();
    this.adminService.addTripData(registerdata).subscribe(
      (res) => {
        if (res) {
        }
      },
      (error) => {
        window.alert("Somthing went wrong");
      }
    )
  }
}
