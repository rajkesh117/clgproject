import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, startWith, map } from 'rxjs';
import { searchBus } from 'src/app/Classes/Book_Bus_classes';
import { bookBusService } from 'src/app/services/bookBusService';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  staertPoint = new FormControl('');
  endPoint = new FormControl('');
  // listofCity: string[] = ['Pune', 'Mumbai', 'Delhi'];
  bordingfilteredOptions: Observable<string[]> | undefined;
  destiCity: Observable<string[]> | undefined;
  forms: any;
  constructor(private spinner: NgxSpinnerService, private bookBus: bookBusService,private router: Router) { }

  ngOnInit() {
    // this.bordingfilteredOptions = this.staertPoint.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
    // this.destiCity = this.endPoint.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
    this.form();
  }

  form() {
    this.forms = new FormGroup({
      startCity: new FormControl('', Validators.required),
      endCity: new FormControl('', Validators.required),
      journeyDate: new FormControl('', Validators.required),
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
    localStorage.removeItem('availableBuses')
    this.spinner.show();
    this.bookBus.getAvailableBuses(searchData).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          res.startTime = new Date(res.startTime);
          let data = JSON.stringify(res);
          localStorage.setItem('availableBuses', data);
          this.router.navigate(['/ShowBusComponent']);
        }
        else{
          window.alert("Bus not found for this date or city");
        }
      },
      (error) => {
        this.spinner.hide();
        window.alert("Somthing went wrong");
      }
    )
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.listofCity.filter(option => option.toLowerCase().includes(filterValue));
  // }
}