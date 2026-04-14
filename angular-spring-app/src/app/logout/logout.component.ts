import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.toastr.warning('You have been logged out', 'Logout');
    this.auth.logout(); // removes token
    this.router.navigate(['/login']);
  }

}
