import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addTrip, busTicket, searchBus } from '../Classes/Book_Bus_classes';

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

    bookBus(data : busTicket){
        const url = environment.apiUrl + 'api/BookTicket/BookorCancelTicket';
        return this.httpClient.post<any>(url, data);
    }

    getAllBookingByUserId(userId:string){
        const url = environment.apiUrl + 'api/BookTicket/GetTicketByUserId?userId='+userId;
        return this.httpClient.get<any>(url);
    }

    cancelTicket(data : busTicket){
        const url = environment.apiUrl + 'api/BookTicket/CancelTicket';
        return this.httpClient.post<any>(url, data);
    }
}
