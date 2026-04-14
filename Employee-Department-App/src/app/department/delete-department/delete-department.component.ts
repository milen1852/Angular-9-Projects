import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private router: Router, private toastr: ToastrService) { }

  departments: any = {};
  confirmDelete: string = '';

  ngOnInit(): void {
    this.departments = this.departmentService.getSelectedDepartment();

    if(!this.departments){
      this.toastr.warning("Select Department to Delete");
      this.router.navigate(['/get-departments'])
    }
  }

  deleteDepartments(){

    if(this.confirmDelete !== 'YES'){
      this.toastr.info("Deletion Cancelled")
      this.router.navigate(['/get-departments'])
      return;
    }

    this.departmentService.deleteDepartment(this.departments).subscribe({
      next: () => {
        this.toastr.success("Department Deleted Successfully");
        this.router.navigate(['/get-departments'])
      },
      error: () => {
        this.toastr.error("Error in Deleting")
        this.router.navigate(['/get-departments'])
      }
    })
  }

  goBack() {
    this.router.navigate(['/get-departments'])
  }

}
