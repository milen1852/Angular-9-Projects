import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { EmployeeService } from "../employee.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import * as $ from 'jquery';
import 'datatables.net'
import * as moment from "moment";
import Swal from "sweetalert2";


@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css']
})
export class GetEmployeeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService, private router: Router) { }

  table: any
  page = 0;
  size = 5;
  totalElements = 0;

  employees = {};
  selectedEmployee: any = null;

  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  deptId: number | null = null;
  minSalary: number | null = null;
  maxSalary: number | null = null;
  status: string = '';
  hireDateRange: any = null;

  maxDate = moment();

  ranges = {
    Today: [moment(), moment()],
    YesterDay: [moment().subtract(1, "day"), moment().subtract(1, "day")],
    "Last 7 Days": [moment().subtract(7, "days"), moment().subtract(1, "day")],

    "Last 30 Days": [moment().subtract(30, "days"), moment().subtract(1, "day")],

    "This Month": [moment().startOf("month"), moment().endOf("month")],

    "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],

    "Last 2 Months": [moment().subtract(2, "months").startOf("month"), moment().subtract(1, "month").endOf("month")]
  }

  ngOnInit(): void {
    this.loadEmployees()
  }

  ngAfterViewInit(): void {
    this.initDataTable()
  }

  loadEmployees(): void {
    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'key.empId',
      sortDir: 'asc'
    }

    if (this.firstName != null) specRequest.firstName = this.firstName;
    if (this.lastName != null) specRequest.lastName = this.lastName;
    if (this.email != null) specRequest.email = this.email;
    if (this.deptId != null) specRequest.deptId = this.deptId;
    if (this.minSalary != null) specRequest.minSalary = this.minSalary;
    if (this.maxSalary != null) specRequest.maxSalary = this.maxSalary;
    if (this.status) specRequest.status = this.status;

    if (this.hireDateRange && this.hireDateRange?.startDate && this.hireDateRange?.endDate) {

      specRequest.hireDateFrom = moment(this.hireDateRange.startDate).format('YYYY/MM/DD');

      specRequest.hireDateTo = moment(this.hireDateRange.endDate).format('YYYY/MM/DD');
    }

    this.employeeService.getEmployees(specRequest).subscribe({
      next: (d) => {
        this.employees = d.content;
        this.totalElements = d.totalElements;
        this.refreshDataTable()
      },
      error: () => {
        this.toastr.error("Failed to Load Employees");
        this.employees = {};
        this.refreshDataTable();
      }
    })
  }

  private initDataTable(): void {
    this.table = $('#employeeTable').DataTable({
      paging: false,
      searching: false,
      ordering: true,
      info: false,
      destroy: true,

      columns: [
        { data: 'key.empId' },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'key.email' },
        { data: 'phoneNumber' },
        { data: 'deptId' },
        { data: 'salary' ,
          render: (d: number) => d != null ? d.toLocaleString() : '-'
        },
        { data: 'status',
          render: (d: string) => 
            `<span class="badge ${d === "ACTIVE" ? 'bg-success' : 'bg-warning'}">${d}</span>`
         },
        {
          data: 'hireDate',
          render: (d: string) => d ? new Date(d).toLocaleDateString() : '-'
        }
      ]
    })

    $("#employeeTable tbody").on('click', 'tr', (event) => {

      const row = $(event.currentTarget);
      const employee = this.table.row(row).data();

      if (row.hasClass('selected-row')) {
        row.removeClass('selected-row')
        this.selectedEmployee = null;
      }

      else {
        $("#employeeTable tbody tr").removeClass('selected-row')
        row.addClass('selected-row')
        this.selectedEmployee = employee;
      }
    })
  }

  private refreshDataTable(): void {
    if (this.table) {
      this.table.clear();
      this.table.rows.add(this.employees);
      this.table.draw(false);
    }
  }

  searchEmployees(): void {
    this.page = 0;
    this.loadEmployees();
  }

  resetFilters(): void {
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.deptId = null;
    this.minSalary = null;
    this.maxSalary = null;
    this.status = '';
    this.hireDateRange = null;

    this.toastr.info("All Fields Reseted")
    this.page = 0;
    this.loadEmployees();
  }

  nextPage(): void {
    if ((this.page + 1) * this.size < this.totalElements) {
      this.page++;
      this.loadEmployees();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadEmployees();
    }
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.destroy(true)
    }
  }

  viewEmployee(){
    if(!this.selectedEmployee){
      this.toastr.warning("Select an Employee")
      return;
    }

    const empId = this.selectedEmployee.key.empId;
    const email = this.selectedEmployee.key.email;

    this.router.navigate(['/get-employeeById', empId, email])
  }

  updateEmployee(){
    this.employeeService.setSelectedEmployee(this.selectedEmployee);
    this.router.navigate(['/update-employee'])
  }

  deleteEmployee(){
    if(!this.selectedEmployee){
      this.toastr.warning("Please select an Employee")
      return;
    }

    const {empId, email} = this.selectedEmployee.key

    Swal.fire({
      title: 'Deactivate Employee ?',
      text: 'This Employee will be marked as INACTIVE',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactivate',
      confirmButtonColor: '#d33',
      cancelButtonText: 'No, Cancel',
      cancelButtonColor: '#6c757d',
      width: '32rem'
    }).then((result) => {

      if(result.isConfirmed){
        this.employeeService.deleteEmployee(empId, email).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deactivated!',
              icon: 'success',
              text: "Employee INACTIVE now",
              // timer: 3000,
              showConfirmButton: true,
              heightAuto: true
            });
            this.loadEmployees();
            this.selectedEmployee = null;
          },

          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to Deactivate Employee',
              heightAuto: false
            })
          }
        })
      }
    })
  }


  goBack(): void {
    this.router.navigate(['/dashboard'])
  }
}
