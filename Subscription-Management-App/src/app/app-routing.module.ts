import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetUsersComponent } from './user/get-users/get-users.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'get-users', component: GetUsersComponent, canActivate: [AuthGuard]},

  {path: 'view-user/:userId', component: ViewUserComponent, canActivate: [AuthGuard]},

  {path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard]},

  {path: 'update-user', component: UpdateUserComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'login', pathMatch: "full"},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
