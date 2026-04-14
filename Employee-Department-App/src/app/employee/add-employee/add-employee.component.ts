import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private location: Location, private toastr: ToastrService) { }

  employee: any = {}

  errorMessages: { [key: string]: string[]} = {};

  ngOnInit(): void {
    this.employee.status = 'ACTIVE';
  }

  addEmployee(form: NgForm){

    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {
        this.toastr.success("Employee Added Successfully")
        form.resetForm({
          status: 'ACTIVE'
        });
        this.errorMessages = {};
      },
      error: (err) => {
        if(err.status == 400 && err.error)
          this.errorMessages = err.error;
      }
    })
  }

  clearForm(form: NgForm){
    form.resetForm({
      status: 'ACTIVE'
    });
    this.errorMessages = {};
    this.toastr.info("Form Cleared")
  }

  goBack(): void {
    this.location.back();
  }

}
