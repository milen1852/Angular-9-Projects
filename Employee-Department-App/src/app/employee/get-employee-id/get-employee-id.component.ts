import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { data } from 'jquery';

@Component({
  selector: 'app-get-employee-id',
  templateUrl: './get-employee-id.component.html',
  styleUrls: ['./get-employee-id.component.css']
})
export class GetEmployeeIdComponent implements OnInit {

  employee;

  constructor(private employeeService: EmployeeService, private router: Router,
     private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {

    const empId = Number(this.route.snapshot.paramMap.get('empId'));
    const email = this.route.snapshot.paramMap.get('email');

    if(!empId || !email){
      this.router.navigate(['/get-employees']);
      return;
    }

    this.employeeService.getEmployeeById(empId, email).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: () => {
        this.toastr.error("Employee Not Found");
        this.router.navigate(['/get-employees'])
      }
    }
    )
  }

  goBack(){
    this.router.navigate(['/get-employees']);
  }

}
