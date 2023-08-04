import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/Classes/Book_Bus_classes';
import { AuthService } from 'src/app/services/authService';
import { loginService } from 'src/app/services/loginservice';
import { NgxSpinnerService } from "ngx-spinner";

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
  isemailVerified = false;
  isLogin = true;
  enteredOTP: string | undefined;
  apiOTP: string | undefined;
  public forms: any;

  constructor(private loginservice: loginService,
    private router: Router,
    public datepipe: DatePipe,
    private authservice: AuthService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.randomString(5);
    this.form();
    this.islogedinUser()
  }

  islogedinUser() {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    if (username && password) {
      let loginform = new login();
      loginform.emailId = username;
      loginform.password = password;
      loginform._id = "";
      loginform.name = "";
      loginform.dateOfBirth = new Date();
      loginform.role = "";
      this.autologin(loginform, true);
    }
    else {
      return;
    }
  }

  form() {
    this.forms = new FormGroup({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
    })
  }

  randomString(length: any) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
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
    if (!this.forms.value.emailId || !this.forms.value.password) {
      window.alert("Please fill Required Fields");
      return;
    }
    let loginform = new login();
    loginform.emailId = this.forms.value.emailId;
    loginform.password = this.forms.value.password;
    loginform._id = "";
    loginform.name = "";
    loginform.dateOfBirth = new Date();
    loginform.role = "";
    this.autologin(loginform, false);
  }

  autologin(loginform: login, autoapicall: boolean) {
    this.spinner.show();
    this.loginservice.loginuser(loginform).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          if (autoapicall) {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('islogin');
            localStorage.removeItem('userRole');
          }
          localStorage.setItem('username', res.emailId);
          localStorage.setItem('password', res.password);
          localStorage.setItem('islogin', 'true');
          localStorage.setItem('userRole', res.role);
          this.authservice.getAuth(true);
          this.router.navigate(['/HomepageComponent']);
        }
        else {
          window.alert("Wrong EmailID or Password");
        }
      },
      (error) => {
        this.spinner.hide();
        window.alert("Somthing went wrong");
      }
    )
  }

  mapping() {
    let registerForm = new login();
    registerForm._id = "";
    registerForm.name = this.forms.value.name;
    registerForm.emailId = this.forms.value.emailId;
    registerForm.password = this.forms.value.password;
    registerForm.dateOfBirth = this.forms.value.dateOfBirth;
    registerForm.role = "User";
    return registerForm;
  }
  register() {
    if (!this.forms.valid) {
      window.alert("Please fill Required Fields");
      return;
    }
    let registerdata = this.mapping();
    this.loginservice.registerUser(registerdata).subscribe(
      (res) => {
        if (res) {
          this.isLogin = true;
          // this.router.navigate(['/HomepageComponent']);
        }
      },
      (error) => {
        window.alert("Somthing went wrong");
      }
    )
  }

  verifyEmailwithOTP() {
    if (!this.forms.valid) {
      window.alert("Please fill Required Fields");
      return;
    }
    let registerdata = this.mapping();
    this.loginservice.verifyEmail(registerdata).subscribe(
      (res) => {
        if (res != null) {
          this.apiOTP = res;
          console.log(res);
        }
        else {
          window.alert("Email already used by some one");
          return;
        }
      },
      (error) => {
        window.alert("Somthing went wrong");
      }
    )
  }

  checkotp() {
    if (this.enteredOTP == this.apiOTP) {
      this.isemailVerified = true;
      window.alert("Verification Completed");
    } else {
      window.alert("Wrong OTP Retry");
      return;
    }
  }

}
