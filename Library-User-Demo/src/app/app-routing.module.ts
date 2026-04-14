import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { GetBorrowComponent } from './borrow-book/get-borrow/get-borrow.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginGuard } from './auth/login.guard';
import { AddBorrowComponent } from './borrow-book/add-borrow/add-borrow.component';
import { GetBooksComponent } from './book/get-books/get-books.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { ViewBorrowComponent } from './borrow-book/view-borrow/view-borrow.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'get-borrow', component: GetBorrowComponent, canActivate: [AuthGuard]},

  {path: 'add-borrow', component: AddBorrowComponent, canActivate: [AuthGuard]},

  {path: 'view-borrow/:borrowId/:bookId', component: ViewBorrowComponent, canActivate: [AuthGuard]},

  {path: 'get-book', component: GetBooksComponent, canActivate: [AuthGuard]},

  {path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
