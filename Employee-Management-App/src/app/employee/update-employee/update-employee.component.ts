import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router, private toastr: ToastrService) { }

  employee: any = {};
  statuses: string[] = [];
  errorMessages: { [key: string]: string[] } = {};


  ngOnInit() {
    this.employee = this.employeeService.getSelectedEmployee();

    if (!this.employee) {
      this.router.navigate(['/get-employees']);
      return;
    }

    this.employeeService.getStatus().subscribe(
      data => this.statuses = data
    );
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: () => {
        this.toastr.success('Employee updated successfully');
        this.errorMessages = {};
        this.router.navigate(['/get-employees']);
      },
      error: (err) => {
        console.log('Validation errors from backend:', err);

        // ✅ DIRECTLY USE BACKEND JSON
        if (err.status === 400 && err.error) {
          this.errorMessages = err.error;
        }
        else {
          this.toastr.error("Update Failed")
        }
      }
    });
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.toastr.info('Form cleared');
  }

  goBack(): void{
    this.router.navigate(['/get-employees'])
  }
}
