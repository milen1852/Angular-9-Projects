import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: any = {};
  statuses: string[] = [];
  errorMessages: { [key: string]: string[] } = {};

  constructor(private employeeService: EmployeeService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.employee.status = 'ACTIVE';
    this.employeeService.getStatus().subscribe({
      next: data => {
        this.statuses = data;
        console.log('Statuses:', this.statuses); // 🔍 DEBUG
      },
      error: () => this.toastr.error('Failed to load employee statuses')
    });

  }

  saveEmployee(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning("Add Required Employee Details");
      return;
    }

    this.employeeService.addEmployee(this.employee)
      .subscribe({
        next: () => {
          this.toastr.success('Employee created successfully');
          this.router.navigate(['/get-employees']);
        },
        error: (err) => {
          console.log('Validation errors from backend:', err);
          if (err.status === 400 && err.error) {
            this.errorMessages = err.error;
            console.log(this.errorMessages)
          }
        }
      });
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.toastr.info('Form cleared');
  }

  goBack(){
    this.router.navigate(['/get-employees'])
  }

}
