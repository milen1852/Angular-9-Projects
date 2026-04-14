import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../models/user.model';
import * as $ from 'jquery';
import 'datatables.net';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  table: any;
  page = 0;
  size = 5;
  totalElements = 0;

  selectedUser: any = null;

  users: Users[] = [];

  userId: number | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  status = ''
  subStartDate: any = null;

  maxDate = moment();
  ranges: any = {
    Today: [moment(), moment()]
  }


  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  loadUsers() {

    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'key.userId',
      sortDir: 'asc'
    }

    if(this.userId != null) specRequest.userId = this.userId;
    if(this.firstName != null) specRequest.firstName = this.firstName;
    if(this.lastName != null) specRequest.lastName = this.lastName;
    if(this.email != null) specRequest.email = this.email;
    if(this.status) specRequest.status = this.status;

    if(this.subStartDate != null) specRequest.subStartDate = this.subStartDate

    this.userService.getAllUsers(specRequest).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalElements = data.totalElements;
        this.refreshDataTable();
      },

      error: () => {
        this.toastr.error("Failed to Load Users")
        this.users = [];
        this.refreshDataTable();
      }
    })
  }

  private initDataTable(){

    this.table = $('#usersTable').DataTable({
      paging: false,
      searching: false,
      ordering: false,
      info: false,
      destroy: true,

      columns: [
        {data: 'userId'},
        {data: 'firstName'},
        {data: 'lastName'},
        {data: 'email'},
        {data: 'phoneNumber'},
        {data: 'planType'},
        {data: 'price',
          render: (d: number) => d ? d.toLocaleString(): '-'
        },
        {data: 'planId'},
        {data: 'subscriptionStatus',
          render: (d: string) => 
            `<span class="badge ${d === 'ACTIVE' ? 'bg-success px-2 py-2': 'bg-warning px-2 py-2'}">${d}</span>`
        },
        {data: 'subscriptionStartDate',
          render: (d: string) => d ? new Date(d).toLocaleDateString() : '-'
        },
        {data: 'subscriptionEndDate',
          render: (d: string) => d ? new Date(d).toLocaleDateString() : '-'},
        {data: 'isActive',
          render: (d: Boolean) => `<span class="badge ${d ? 'bg-primary px-3 py-2': 'bg-danger px-3 py-2'}">${d}</span>`
        }
      ]
    })

    $('#usersTable tbody').on('click', 'tr', (event) => {
      const row = $(event.currentTarget);
      const user = this.table.row(row).data();

      if(!user) return;

      if(row.hasClass('selected-row')){
        row.removeClass('selected-row');
        this.selectedUser = null;
      }

      else{
        $('#usersTable tbody tr').removeClass('selected-row');
        row.addClass('selected-row');
        this.selectedUser = user;
      }
    })
  }

  private refreshDataTable(): void {
    if(this.table){
      this.table.clear();
      this.table.rows.add(this.users);
      this.table.draw(false);
    }
  }

  searchUsers(): void {
    this.page = 0;
    this.loadUsers();
  }

  resetFilters() {
    this.userId = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.status = '';
    this.subStartDate = null;

    this.page = 0;
    this.loadUsers();
  }

  ngOnDestroy(): void {
    if(this.table){
      this.table.destroy(true);
    }
  }

  prevPage(){
    if(this.page > 0){
      this.page --;
      this.loadUsers();
    }
  }

  nextPage(){
    if((this.page + 1) * this.size < this.totalElements){
      this.page ++;
      this.loadUsers();
    }
  }

  onSizeChange(){
    this.page = 0;
    this.loadUsers();
  }

  goBack(): void {
    this.router.navigate(['/dashboard'])
  }

  viewUser(){
    if(!this.selectedUser){
      this.toastr.warning("Select a user");
      return;
    }

    const userId = this.selectedUser.userId;
    this.router.navigate(['/view-user', userId]);
  }

  updateUser() {
    if(!this.selectedUser){
      this.toastr.warning("Select a user");
      return;
    }

    this.userService.setSelectedUser(this.selectedUser);
    this.router.navigate(['/update-user'])
  }

  deleteUser(){

    if(!this.selectedUser)
      return;

    Swal.fire({
      title: `Deactivate User ${this.selectedUser.firstName} ${this.selectedUser.lastName} ? `,
      text: "This action cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactiavte',
      cancelButtonText : 'No, Cancel'
    }).then(result => {

      if(result.isConfirmed){
        this.deactivate(this.selectedUser.userId, this.selectedUser.firstName, this.selectedUser.email)
      }
    })
  }

  deactivate(userId: number, firstName: string, email: string){
    this.userService.deleteUser(userId, firstName, email).subscribe({
      next: () => {
        Swal.fire('Success', 'User Deactivated', 'success');
        this.loadUsers();
        this.selectedUser = {};
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Update failed', 'error');
      }
    })
  }
}
