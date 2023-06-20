import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  staertPoint = new FormControl('');
  endPoint = new FormControl('');
  listofCity: string[] = ['Pune', 'Mumbai', 'Delhi'];
  bordingfilteredOptions: Observable<string[]> | undefined;
  destiCity:Observable<string[]> | undefined;
  forms: any;
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.bordingfilteredOptions = this.staertPoint.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.destiCity = this.endPoint.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  search(){
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listofCity.filter(option => option.toLowerCase().includes(filterValue));
  }
}