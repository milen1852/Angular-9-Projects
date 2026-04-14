import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/plan/plan.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private planService: PlanService, private userService: UserService, private toastr: ToastrService, 
    private router: Router) { }

  user: any = {
    planType: ''
  };

  planTypes: string[] = [];
  subscriptionStatus: string[] = [];

  errorMessages : {[key: string]: string[]} = {}

  ngOnInit(): void {
    this.userService.getPlanTypes().subscribe({
      next: data => {
        this.planTypes = data;
      },

      error: () => {
        this.toastr.error("Failed to load planTypes")
      }
    })

    // this.userService.getStatus().subscribe({
    //   next : data => {
    //     this.subscriptionStatus = data;
    //   },

    //   error: () => {
    //     this.toastr.error("Failed to load status");
    //   }
    // })

    this.user.subscriptionStatus = 'INACTIVE';
  }

  onPlanTypeChange() {
    this.planService.getPlan(this.user.planType)
      .subscribe(plan => {

        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + plan.durationDays);

        this.user.planId = plan.planId;
        this.user.price = plan.price;
        this.user.subscriptionStartDate = today.toISOString().substring(0,10);
        this.user.subscriptionEndDate = end.toISOString().substring(0,10);
        this.user.subscriptionStatus = 'ACTIVE'
      });
  }

  addUser(){
    this.userService.addUser(this.user).subscribe({
      next: () => {
        Swal.fire('Success', 'User Added Successfully', 'success')
        this.errorMessages = {}
      },
      error: (err) => {
        if(err.status === 400){
          this.errorMessages = err.error;
        }
        else{
          console.log(err);
          this.toastr.error(err.error)
        }
      }
    })
  }

  clearForm(form: NgForm){
    form.resetForm({
      subscriptionStatus: 'INACTIVE'
    })
    this.errorMessages = {}
    this.toastr.info("Form Cleared")
  }

  goBack(): void {
    this.router.navigate(['/get-users'])
  }
}
