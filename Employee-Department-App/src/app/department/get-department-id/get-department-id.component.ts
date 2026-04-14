import { Component, OnInit } from '@angular/core';
import { Department } from '../models/departments';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-department-id',
  templateUrl: './get-department-id.component.html',
  styleUrls: ['./get-department-id.component.css']
})
export class GetDepartmentIdComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private router: Router, 
    private route: ActivatedRoute, private toastr: ToastrService) { }

  department: any;

  ngOnInit(): void {

    this.department =  this.departmentService.getSelectedDepartment();

    if(!this.department){
      this.router.navigate(['/get-departments'])
    }
    // const deptId = Number(this.route.snapshot.paramMap.get('deptId'))

    // if(!deptId){
    //   this.toastr.warning("Select Department to View")
    //   return;
    // }

    // this.departmentService.getDepartmentById(deptId).subscribe({
    //   next: res => {
    //     this.department = res
    //   },

    //   error: () => {
    //     this.toastr.error("Department Not Found");
    //     this.router.navigate(['/get-departments'])
    //   }
    // })
  }

  goBack() {
    this.router.navigate(['/get-departments'])
  }



}
