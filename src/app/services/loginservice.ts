import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { login } from '../Classes/Book_Bus_classes';

@Injectable({
  providedIn: 'root'
})
export class loginService {

  constructor(public httpClient: HttpClient) { }
  getHeaders(){
    const options = new HttpHeaders();
    options.append('Content-Type','application/json');
    return options
  }

  registerUser(data : login){
    const url = environment.apiUrl + 'api/login/RegisterUser';
    return this.httpClient.post<any>(url, data);
  }

  loginuser(data : login){
    const url = environment.apiUrl + 'api/login/loginUser';
    return this.httpClient.post<any>(url, data);
  }

  
  verifyEmail(data : login){
    const url = environment.apiUrl + 'api/login/otpservice';
    return this.httpClient.post<any>(url, data);
  }
}