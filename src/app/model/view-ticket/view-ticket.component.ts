import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { bookBusService } from 'src/app/services/bookBusService';
import { ViewticketdetailspopupComponent } from '../dialouges/viewticketdetailspopup/viewticketdetailspopup.component';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  ticket: any;
  constructor(public dialog: MatDialog, private spinner: NgxSpinnerService, private busticket: bookBusService) { }

  ngOnInit(): void {
    this.getTicketByUserId();
  }

  View(data: any) {
    this.openDialog(data);
  }
  openDialog(ticket: any): void {
    let username = localStorage.getItem('username');
    let dialogRef = this.dialog.open(ViewticketdetailspopupComponent, {
      width: '900px',
      data: ticket,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  getTicketByUserId() {
    this.spinner.show();
    let username = localStorage.getItem('username') || "";
    this.busticket.getAllBookingByUserId(username).subscribe(
      (res) => {
        this.spinner.hide();
        if (res && res.length != 0) {
          this.ticket = res;
        } else {
          window.alert("No Ticket Found");
        }
      },
      (error) => {
        window.alert("Somthing went wrong");
      }
    )
  }

}
