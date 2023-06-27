import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addTrip, searchBus } from '../Classes/Book_Bus_classes';

@Injectable({
    providedIn: 'root'
})
export class bookBusService {

    constructor(public httpClient: HttpClient) { }
    getHeaders() {
        const options = new HttpHeaders();
        options.append('Content-Type', 'application/json');
        return options
    }

    getAvailableBuses(data: searchBus) {
        const url = environment.apiUrl + 'api/BookTicket/SearchBus';
        return this.httpClient.post<any>(url, data);
    }
}
