import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService, public router: Router) { }

  user = {
    username: '',
    password: ''
  };

  errorMessages: {[key: string]: string[]} = {};

  ngOnInit(): void {

  }

  login() {
    if (!this.user.username || !this.user.password) {
      this.toastr.warning('Enter both Username and Password');
    }

    this.authService.login(this.user).subscribe({
      next: () => {
        this.toastr.success('Login Successfull');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {

        if (err.status === 400) {
          this.errorMessages = err.error;
        } else {
          this.toastr.error(err.error.error);
          this.errorMessages = {};
        }
      }
    });
  }
}
