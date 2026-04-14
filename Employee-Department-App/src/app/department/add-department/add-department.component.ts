import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private location: Location, private toastr: ToastrService) { }

  department: any = {};

  errorMessages: { [key: string]: string[] } = {};
  ngOnInit(): void {
  }

  addDepartment(form: NgForm) {

    this.departmentService.addDepartment(this.department).subscribe({
      next: () => {
        this.toastr.success("Department Added Succesfully")
        form.resetForm();
      },
      error: (err) => {
        if(err.status === 400 && err.error){
          this.errorMessages = err.error;
        }
      }
    })
  }

  clearForm(form: NgForm){
    form.resetForm();
    this.errorMessages = {};
    this.toastr.info("Form Cleared")
  }

  goBack(): void {
   this.location.back();
  }

}
