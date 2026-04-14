import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    if (!this.user) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
