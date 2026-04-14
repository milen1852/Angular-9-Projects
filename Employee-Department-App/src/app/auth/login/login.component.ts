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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  login(){
    if( ! this.username || ! this.password){
      this.toastr.warning("Enter Both Username and Password");
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.toastr.success("Login Successfull")
        this.router.navigate(['/dashboard'])
      },
      error: () => {
        this.toastr.error("Invalid Username or Password")
      }
    })
  }

  ngOnInit(): void {
  }

}
