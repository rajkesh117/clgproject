import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string | undefined;
  userRole: string | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getUSerDetails();
  }

  getUSerDetails() {
    let username = localStorage.getItem('username');
    let userRole = localStorage.getItem('userRole');
    if (username && userRole) {
      this.username = username;
      this.userRole = userRole
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('islogin');
    localStorage.removeItem('userRole');
    this.router.navigate(['']);
  }

}
