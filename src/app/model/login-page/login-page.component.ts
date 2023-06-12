import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  captcha: string | undefined;
  userName: string | undefined;
  password: string | undefined;
  enteredCaptcha: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.randomString(5);
  }

  randomString(length:any) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    this.captcha = result;
    return result;
}

  validate() {
    if (this.userName != "" || this.password != "") {
      if (this.captcha == this.enteredCaptcha) {
        return true;
      }
    }
    return false;
  }

  login() {
    if (this.validate()) {
      window.alert("Login successfull");
    }
  }

}
