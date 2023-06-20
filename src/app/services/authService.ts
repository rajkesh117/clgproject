import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    constructor() { }
    getAuth(data: any) {
        this.isLoggedIn = data;
    }
    isAuthenticated() {
        let islogin = localStorage.getItem('islogin');
        if (islogin && islogin == "true") {
            this.isLoggedIn = true;
        }
        return this.isLoggedIn;
    }
}