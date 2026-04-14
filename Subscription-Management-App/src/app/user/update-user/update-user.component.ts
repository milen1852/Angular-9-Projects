import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { PlanService } from 'src/app/plan/plan.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router,
    private planService: PlanService) { }

  user: Users;

  planTypes: string[] = [];
  statuses: string[] = [];

  errorMessages: { [key: string]: string[] } = {};

  ngOnInit(): void {

    this.user = this.userService.getSelectedUser();

    if(!this.user){
      this.toastr.warning("Select a User")
      this.router.navigate(['/get-users'])
      return;
    }

    this.userService.getPlanTypes().subscribe({
      next: (planType) => {
        this.planTypes = planType;
      },
      error: () => {
        this.toastr.error("Failed to load PlanTypes")
      }
    })

    this.userService.getStatus().subscribe({
      next: (status) => {
        this.statuses = status;
      },
      error: (err) => {
        this.toastr.error(err.error)
      }
    })
  }

  onPlanTypeChange(){
    this.planService.getPlan(this.user.planType).subscribe(
      plan => {
        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + plan.durationDays);

        this.user.planId = plan.planId;
        this.user.price = plan.price;
        this.user.subscriptionStartDate = today.toISOString().substring(0, 10);
        this.user.subscriptionEndDate = end.toISOString().substring(0, 10);
      }
    )
  }

  updateUser(form: NgForm) {
    this.userService.udpateUser(this.user).subscribe({
      next: () => {
        this.toastr.success("User Updated Successfully");
        this.errorMessages = {}
        form.resetForm({
          userId: this.user.userId,
          firstName: this.user.firstName,
          email: this.user.email
        })
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessages = err.error;
        }
      }
    })
  }

  clearForm(form: NgForm) {
    this.errorMessages = {};
    this.toastr.info("Form Cleared")
    form.resetForm({
      userId: this.user.userId,
      firstName: this.user.firstName,
      email: this.user.email
    })
  }

  goBack() {
    this.router.navigate(['/get-users'])
  }

}
