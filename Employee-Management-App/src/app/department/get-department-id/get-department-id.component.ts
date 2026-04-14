import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee/employee.service';

@Component({
    selector: 'app-get-department-id',
    templateUrl: './get-department-id.component.html',
    styleUrls: ['./get-department-id.component.css']
})
export class GetDepartmentIdComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private toastr: ToastrService
    ) { }

    employee: any;
    loading = true;

    ngOnInit(): void {
        const empId = this.route.snapshot.paramMap.get('empId');
        const email = this.route.snapshot.paramMap.get('email')

        if (!empId || !email) {
            this.router.navigate(['/get-employees']);
            return;
        }

        this.employeeService.getEmployeeWithDepartment(+empId, email).subscribe({
            next: res => {
                this.employee = res;
                this.loading = false;
            },
            error: () => {
                this.toastr.error('Employee not found');
                this.router.navigate(['/get-employees']);
            }
        });
    }

    goBack(): void{
        this.router.navigate(['/get-employees'])
    }

}
