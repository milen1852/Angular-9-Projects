import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private route: Router, private toastr: ToastrService) { }

  departments: any = {};

  errorMessages: {[key: string]: string[]} = {};

  ngOnInit(): void {
    
    this.departments = this.departmentService.getSelectedDepartment();

    if(!this.departments){
      this.route.navigate(['/get-departments'])
    }
  }

  updateDepartment(form: NgForm) {

    this.departmentService.updateDepartment(this.departments).subscribe({
      next: (res) => {
        
        this.toastr.success("Departmet Updated Successfully");
        form.resetForm({
          deptId: this.departments.deptId,
          createdAt: this.departments.createdAt
        })
        console.log("Data from deparatment : ",res)
        this.errorMessages = {}
      },

      error: (err) => {
        if(err.error) {
          this.errorMessages = err.error;
          console.log(this.errorMessages)
        }
      }
    })
  }

  clearForm(form: NgForm){
    form.resetForm({
      deptId: this.departments.deptId,
      createdAt: this.departments.createdAt
    })

    this.errorMessages = {};
  }

  goBack(): void {
    this.route.navigate(['/get-departments'])
  }

}
