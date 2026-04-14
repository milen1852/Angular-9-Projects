import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  rememberMe = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {

    const success = this.authService.login(this.username, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  ngOnInit(): void {
  }

}
