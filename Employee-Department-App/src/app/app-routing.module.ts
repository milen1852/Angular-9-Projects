import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetEmployeeComponent } from './employee/get-employee/get-employee.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { GetDepartmentComponent } from './department/get-department/get-department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { LoginGuard } from './auth/login.guard';
import { UpdateDepartmentComponent } from './department/update-department/update-department.component';
import { DeleteDepartmentComponent } from './department/delete-department/delete-department.component';
import { GetDepartmentIdComponent } from './department/get-department-id/get-department-id.component';
import { GetEmployeeIdComponent } from './employee/get-employee-id/get-employee-id.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'get-employees', component: GetEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'get-employeeById/:empId/:email', component: GetEmployeeIdComponent, canActivate: [AuthGuard]},

  {path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'update-employee', component: UpdateEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'get-departments', component: GetDepartmentComponent, canActivate: [AuthGuard]},

  {path: 'get-departmentById', component: GetDepartmentIdComponent, canActivate: [AuthGuard]},

  {path: 'add-department', component: AddDepartmentComponent, canActivate: [AuthGuard]},

  {path: 'update-department', component: UpdateDepartmentComponent, canActivate: [AuthGuard]},

  {path: 'delete-department', component: DeleteDepartmentComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
