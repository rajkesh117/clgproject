import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminService } from 'src/app/services/adminService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tripData: any;
  constructor(private addTripservice : adminService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getalldata();
  }

  getalldata(){
    this.spinner.show();
    this.addTripservice.getAllTrip().subscribe(
      (res)=>{
        this.spinner.hide();
        if(res){
          this.tripData = res;
        }
        else{
          window.alert("No Trip Found");
        }
      },
      (error) => {
        this.spinner.hide();
        window.alert("Somthing went wrong");
      }
    )
  }

}
