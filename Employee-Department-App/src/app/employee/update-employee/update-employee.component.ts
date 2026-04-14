import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  employee: any = {}

  errorMessages: {[key: string]: string[]} = {};

  ngOnInit(): void {

    this.employee = this.employeeService.getSelectedEmployee(); 

    if(!this.employee){
      this.router.navigate(['/get-employees'])
    }
  }

  updateEmployee(form: NgForm) {

    const {empId, email} = this.employee.key

    this.employeeService.updateEmployee(empId, email, this.employee).subscribe({
      next: () => {
        this.toastr.success("Employee Updated Successfully")
        form.resetForm({
          empId: this.employee.key.empId,
          email: this.employee.key.email,
          status: this.employee.status
        })
        this.errorMessages = {}
      },

      error: (err) => {
        if(err.error){
          this.errorMessages = err.error;
        }
      }
    })
  }

  clearForm(form: NgForm){
    form.resetForm({
      status: this.employee.status,
      empId: this.employee.key.empId,
      email: this.employee.key.email
    })
    this.toastr.info("Form Cleared")
  }

  goBack(): void {
    this.router.navigate(['/get-employees'])
  }

}
