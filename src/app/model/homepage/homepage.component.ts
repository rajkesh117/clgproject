import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listofCity.filter(option => option.toLowerCase().includes(filterValue));
  }
}