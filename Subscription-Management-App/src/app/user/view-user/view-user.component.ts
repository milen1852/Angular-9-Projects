import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private userService: UserService,private route: ActivatedRoute, public router: Router, private toastr: ToastrService) { }

  user: any;

  ngOnInit(): void {

    const userId = Number(this.route.snapshot.paramMap.get("userId"));

    if(!userId){
      this.toastr.warning('Select a User')
      this.router.navigate(['/get-users'])
      return;
    }

    this.userService.getUser(userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err)
        this.toastr.error("User Not Found")
        this.router.navigate(['/get-users'])
      }
    })
  }

}
