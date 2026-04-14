import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import * as moment from 'moment';

@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css']
})
export class GetEmployeeComponent implements OnInit, AfterViewInit, OnDestroy {

  table: any;

  searchName: '';
  email: string | null = null;
  deptId: number | null = null;
  minSalary: number | null = null;
  maxSalary: number | null = null;
  status = '';
  hireDateRange: any = null;

  page = 0;
  size = 5;
  totalElements = 0;

  employees: any[] = [];
  selectedEmployee: any = null;


  constructor(private employeeService: EmployeeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.destroy(true);
    }
  }

  maxDate = moment();

  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  };

  loadEmployees(): void {

    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'key.empId',
      sortDir: 'asc'
    };

    if (this.searchName) specRequest.searchName = this.searchName;
    if (this.email !== null) specRequest.email = this.email;
    if (this.deptId !== null) specRequest.deptId = this.deptId;
    if (this.minSalary !== null) specRequest.minSalary = this.minSalary;
    if (this.maxSalary !== null) specRequest.maxSalary = this.maxSalary;
    if (this.status) specRequest.status = this.status;

    if (this.hireDateRange && this.hireDateRange?.startDate && this.hireDateRange?.endDate) {
      specRequest.hireDateFrom = moment(this.hireDateRange.startDate).format('YYYY-MM-DD')

      specRequest.hireDateTo = moment(this.hireDateRange.endDate).format('YYYY-MM-DD')
    }


    this.employeeService.getEmployees(specRequest).subscribe({
      next: (res) => {
        this.employees = res.content;
        this.totalElements = res.totalElements;

        this.refreshDataTable();
      },
      error: () => {
        this.toastr.error('Failed to load employees');
        this.employees = [];
        this.refreshDataTable();
      }
    });
  }

  private initDataTable(): void {
    this.table = $('#employeeTable').DataTable({
      paging: false,
      searching: false,
      ordering: false,
      info: false,
      destroy: true,

      columns: [
        { data: 'key.empId' },
        {
          data: null,
          render: (d: any) =>
            `${d.firstName ?? ''} ${d.lastName ?? ''}`.trim()
        },
        { data: 'key.email' },
        { data: 'phoneNumber' },
        { data: 'deptId' },
        {
          data: 'salary',
          render: (d: number) => d != null ? d.toLocaleString() : '—'
        },
        {
          data: 'status',
          render: (d: string) =>
            `<span class="badge ${d === 'ACTIVE' ? 'bg-success' : 'bg-warning'}">${d}</span>`
        },
        {
          data: 'hireDate',
          render: (d: string) =>
            d ? new Date(d).toLocaleDateString() : '—'
        }
      ]
    });

    // Row selection
    $('#employeeTable tbody').on('click', 'tr', (e) => {
      const row = $(e.currentTarget);
      const data = this.table.row(row).data();

      if (!data) return;

      if (row.hasClass('selected-row')) {
        row.removeClass('selected-row')
        this.selectedEmployee = null;
      }

      else {
        $('#employeeTable tbody tr').removeClass('selected-row');
        row.addClass('selected-row');
        this.selectedEmployee = data;
      }
    });
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
    this.searchName = '';
    this.email = null;
    this.deptId = null;
    this.minSalary = null;
    this.maxSalary = null;
    this.status = '';

    this.hireDateRange = null;

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

  getToIndex(): number {
    return Math.min((this.page + 1) * this.size, this.totalElements);
  }

  getFromIndex(): number {
    return this.totalElements === 0 ? 0 : this.page * this.size + 1;
  }


  getEmployeeWithDepartment(): void {
    if (!this.selectedEmployee) {
      this.toastr.warning('Please select an employee');
      return;
    }
    const empId = this.selectedEmployee.key.empId;
    const email = this.selectedEmployee.key.email
    this.router.navigate(['/get-departmentId', empId, email]);
  }

  editEmployee(): void {
    if (!this.selectedEmployee) {
      this.toastr.warning('Please select an employee');
      return;
    }
    this.employeeService.setSelectedEmployee(this.selectedEmployee);
    this.router.navigate(['/update-employee']);
  }

  deleteEmployee(): void {
    if (!this.selectedEmployee) {
      this.toastr.warning('Please select an employee');
      return;
    }
    this.employeeService.setSelectedEmployee(this.selectedEmployee);
    this.router.navigate(['/delete-employee']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard'])
  }
}
