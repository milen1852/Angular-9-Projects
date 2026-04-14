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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  user = {
    username: '',
    password: ''
  }

  errorMessages: {[key:string]: string[]} = {}

  ngOnInit(): void {
  }

  login(){

    if(!this.user.username || !this.user.password){
      this.toastr.warning("Enter both Username and Password")
      return;
    }

    this.authService.login(this.user).subscribe({
      next: () => {
        this.toastr.success("Login Successfull");
        this.router.navigate(['/dashboard'])
      },

      error: () => {
        this.toastr.error("Invalid Username or Password")
      }
    })
  }

}
