import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addTrip, searchBus } from '../Classes/Book_Bus_classes';

@Injectable({
    providedIn: 'root'
})
export class bookingdatatransferService {
    getdata: any;
    senddata: any;

    constructor() {

    }
    Getdata() {
        return this.getdata;
    }
    SendData(event: any) {
        this.getdata = event;
    }
}