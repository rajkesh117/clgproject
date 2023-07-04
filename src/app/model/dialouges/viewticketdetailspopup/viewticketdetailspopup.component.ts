import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { bookBusService } from 'src/app/services/bookBusService';

@Component({
  selector: 'app-viewticketdetailspopup',
  templateUrl: './viewticketdetailspopup.component.html',
  styleUrls: ['./viewticketdetailspopup.component.css']
})
export class ViewticketdetailspopupComponent implements OnInit {

  bookingData : any;
  constructor(public dialogRef: MatDialogRef<ViewticketdetailspopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService, private bookBus: bookBusService,
    private router: Router) { }

  ngOnInit(): void {
    this.bookingData = this.data;
  }

  print(cmpName:string){
      let printContents = document.getElementById(cmpName)?.innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents ||"";
 
      window.print();
      window.location.reload();
      document.body.innerHTML = originalContents;
 }


  close(){
    this.dialogRef.close();
  }

}
