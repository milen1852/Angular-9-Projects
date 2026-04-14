import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetEmployeeComponent } from './employee/get-employee/get-employee.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { GetDepartmentComponent } from './department/get-department/get-department.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { GetDepartmentIdComponent } from './department/get-department-id/get-department-id.component';
import { LoginGuard } from './auth/login.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'get-employees', component: GetEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'update-employee', component: UpdateEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'delete-employee', component: DeleteEmployeeComponent, canActivate: [AuthGuard]},

  {path: 'get-departments', component: GetDepartmentComponent, canActivate: [AuthGuard]},

  {path: 'get-departmentId/:empId/:email', component: GetDepartmentIdComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
