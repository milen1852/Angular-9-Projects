import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''

  constructor(private authService : AuthService, private router: Router, private toastr: ToastrService) { }

  login() {
    if (!this.username || !this.password) {
      this.toastr.warning('Please enter username and password');
      return;
    }

    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.toastr.success('Login successful');
          this.router.navigate(['/dashboard', {replaceUrl: true}]);
        },
        error: () => {
          this.toastr.error("Invalid Username or Password")
        }
      });
  }

  ngOnInit(): void {
  }

}
