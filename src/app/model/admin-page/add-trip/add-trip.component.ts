import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { addTrip } from 'src/app/Classes/Book_Bus_classes';
import { adminService } from 'src/app/services/adminService';
import { AddEditTripDialougeComponent } from '../../dialouges/add-edit-trip-dialouge/add-edit-trip-dialouge.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  dialougeopen: boolean | undefined;
  tripinfo: any;
  tripPopupData: any;
  constructor(private adminService: adminService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTripByUserId()
  }

  openDialog(status: any,tripdata : any): void {
    this.dialougeopen = true;
    let username = localStorage.getItem('username');
    let dialogRef = this.dialog.open(AddEditTripDialougeComponent, {
      width: '600px',
      data: { form: tripdata, status: status }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialougeopen = false;
      this.getTripByUserId();
    });
  }

  DeleteTrip(data: addTrip) {
    if (confirm("Are you sure you want to Delete") == true) {
      data.isDeleted = true;
      this.spinner.show();
      this.adminService.addTripData(data).subscribe(
        (res) => {
          this.spinner.hide();
          if (res) {
            window.alert("Delted Successfull");
            this.getTripByUserId();
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

  Edit(data: addTrip) {
    this.tripPopupData = data;
    this.openDialog(2,data);
  }

  getTripByUserId() {
    this.tripinfo = [];
    this.spinner.show();
    let username = localStorage.getItem('username') || "";
    this.adminService.getTripData(username).subscribe(
      (res) => {
        this.spinner.hide();
        if (res && res.length != 0) {
          this.tripinfo = res;
        } else {
          window.alert("No Trip Found");
        }
      },
      (error) => {
        window.alert("Somthing went wrong");
      }
    )
  }

}
