import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addTrip } from '../Classes/Book_Bus_classes';

@Injectable({
    providedIn: 'root'
})
export class adminService {

    constructor(public httpClient: HttpClient) { }
    getHeaders() {
        const options = new HttpHeaders();
        options.append('Content-Type', 'application/json');
        return options
    }

    addTripData(data: addTrip) {
        const url = environment.apiUrl + 'api/login/loginUser';
        return this.httpClient.post<any>(url, data);
    }
}