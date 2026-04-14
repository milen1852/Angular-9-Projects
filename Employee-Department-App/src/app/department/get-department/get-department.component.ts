import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import 'datatables.net'
import * as moment from 'moment';

@Component({
  selector: 'app-get-department',
  templateUrl: './get-department.component.html',
  styleUrls: ['./get-department.component.css']
})
export class GetDepartmentComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private departmentService: DepartmentService, private route: Router, private toastr: ToastrService) { }

  table: any;
  page = 0;
  size = 5;
  totalElements = 0;

  departments: any = {};
  selectedDepartment: any = null;

  deptId: number | null = null;
  deptName: string | null = null;
  location: string | null = null;
  createdAtRange: any = null;

  maxDate = moment()

  ngOnInit(): void {
    this.loadDepartments()
  }

  ngAfterViewInit(): void {
    this.initDatatable()
  }

  loadDepartments(): void {
    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'deptId',
      sortDir: 'asc'
    }

    if (this.deptId != null) specRequest.deptId = this.deptId;
    if (this.deptName != null) specRequest.deptName = this.deptName;
    if (this.location != null) specRequest.location = this.location;

    if (this.createdAtRange != null && this.createdAtRange?.startDate && this.createdAtRange?.endDate) {
      specRequest.createdAtFrom = moment(this.createdAtRange.startDate).format("DD/MM/YYYY, HH:mm:ss")

      specRequest.createdAtTo = moment(this.createdAtRange.endDate).format("DD/MM/YYYY, HH:mm:ss")

      console.log(specRequest);
    }

    this.departmentService.getDepartments(specRequest).subscribe({
      next: (data) => {
        this.departments = data.content;
        this.totalElements = data.totalElements;
        this.refreshDatatable();
      },
      error: () => {
        this.toastr.error("Failed to load Departments");
        this.departments = {};
        this.refreshDatatable();
      }
    })
  }

  private initDatatable(): void {
    this.table = $("#departmentTable").DataTable({
      paging: false,
      searching: false,
      ordering: true,
      info: false,
      destroy: true,

      columns: [
        { data: 'deptId' },
        { data: 'name' },
        { data: 'location' },
        {
          data: 'createdAt',
          render: (d: string) => d ? new Date(d).toLocaleString() : '-'
        },
        {
          data: 'updatedAt',
          render: (d: string) => d ? new Date(d).toLocaleString() : '-'
        }
      ]
    })

    $("#departmentTable tbody").on('click', 'tr', (event) => {

      const row = $(event.currentTarget);
      const department = this.table.row(row).data();

      if (!department) return;

      if (row.hasClass('selected-row')) {
        row.removeClass('selected-row');
        this.selectedDepartment = null;
      } 
      else {
        $('#departmentTable tbody tr').removeClass('selected-row');
        row.addClass('selected-row');
        this.selectedDepartment = department;
      }
    });

  }

  private refreshDatatable(): void {
    this.table.clear();
    this.table.rows.add(this.departments);
    this.table.draw(false)
  }

  searchDepartments(): void {
    this.page = 0;
    this.loadDepartments();
  }

  resetFilters(): void {
    this.deptId = null;
    this.deptName = null;
    this.location = null;
    this.createdAtRange = null;

    this.toastr.info("Fields Reseted")
    this.page = 0;
    this.loadDepartments();
  }

  nextPage(): void {
    if ((this.page + 1) * this.size < this.totalElements) {
      this.page++;
      this.loadDepartments();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadDepartments();
    }
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.destroy(true);
    }
  }

  viewDepartment() {

    // if(!this.selectedDepartment){
    //   this.toastr.warning("Select a Department")
    //   return;
    // }
    // const deptId = this.selectedDepartment.deptId;

    // this.route.navigate(['/get-departmentById', deptId]);

    this.departmentService.setSelectedDepartment(this.selectedDepartment);
    this.route.navigate(['/get-departmentById'])
  }


  updateDepartment() {
    this.departmentService.setSelectedDepartment(this.selectedDepartment);
    this.route.navigate(['/update-department']);
  }

  deleteDepartment(){
    this.departmentService.setSelectedDepartment(this.selectedDepartment);
    this.route.navigate(['/delete-department'])
  }

  goBack(): void {
    this.route.navigate(['/dashboard'])
  }

}
