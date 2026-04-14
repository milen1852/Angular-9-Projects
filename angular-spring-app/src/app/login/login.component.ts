import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error = '';
  

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  login() {
    localStorage.removeItem('token');
  console.log('Login button clicked');

  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      this.toastr.success('Login successful', 'Welcome');
      this.authService.saveToken(res.access_token);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Login failed', err);
      this.toastr.error("Invalid Username or Password")
    }
  });
}


  ngOnInit(): void {
  }

}
