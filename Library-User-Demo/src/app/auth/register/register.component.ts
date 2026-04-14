import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, public router: Router, private toastr: ToastrService) { }

  user: any = {
    status: '',
    createdBy: ''
  };

  statuses: string[] = [];
  createdByList: string[] = [];

  errorMessages: { [key: string]: string[] } = {};

  ngOnInit(): void {

    this.userService.getStatus().subscribe({
      next: (data) => {
        this.statuses = data;
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });


    this.userService.getCreatedBy().subscribe({
      next: (data) => {
        this.createdByList = data;
      },

      error: (err) => {
        this.toastr.error(err.error.error);
      }
    });
  }

  registerUser() {

    this.userService.addUser(this.user).subscribe({
      next: () => {
        this.toastr.success('User Added Successfully');
        this.errorMessages = {};

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessages = err.error;
        } else {
          this.toastr.error(err.error.error);
        }
      }
    });
  }

}
