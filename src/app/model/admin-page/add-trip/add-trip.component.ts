import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addTrip } from 'src/app/Classes/Book_Bus_classes';
import { adminService } from 'src/app/services/adminService';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  constructor(private adminService : adminService) { }

  ngOnInit(): void {
  }

}
