import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router, private toastr: ToastrService) { }

  employee: any = {};
confirmDelete: string = '';

ngOnInit() {
  this.employee = this.employeeService.getSelectedEmployee();

  if (!this.employee) {
    this.router.navigate(['/get-employees']);
  }
}

deleteEmployee() {
  if (this.confirmDelete !== 'YES') {
    this.toastr.info('Deactivation cancelled');
    this.router.navigate(['/get-employees']);
    return;
  }

  this.employeeService.deleteEmployee(this.employee).subscribe({
    next: () => {
      this.toastr.warning('Employee Deactivated successfully');
      this.router.navigate(['/get-employees']);
    },
    error: () => {
      this.toastr.error('Failed to deactivate employee');
    }
  });
}


}
