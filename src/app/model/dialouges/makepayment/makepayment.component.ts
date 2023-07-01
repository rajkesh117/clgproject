import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { bookBusService } from 'src/app/services/bookBusService';

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css']
})
export class MakepaymentComponent implements OnInit {

  public forms: any;
  bookingData: any;
  paymentProcessing: boolean | undefined;
  ispaymentpage = false;
  constructor(public dialogRef: MatDialogRef<MakepaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService, private bookBus: bookBusService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.data);
    this.bookingData = this.data;
  }

  changeview() {
    this.ispaymentpage = true;
  }

  book() {
    this.spinner.show()
    this.bookBus.bookBus(this.data).subscribe(
      (res) => {
        this.spinner.hide()
        if (res) {
          localStorage.removeItem('availableBuses');
          this.dialogRef.close();
          this.router.navigate(['/HomepageComponent']);
        } else {
          window.alert("Seat Not Avaliable");
        }
      },
      (error) => {
        this.spinner.hide()
        window.alert("Somthing went wrong");
      }
    )
  }
}
