import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { GetProductComponent } from './product/get-product/get-product.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginGuard } from './auth/login.guard';
import { UpdateProductComponent } from './product/update-product/update-product.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},

  {path: 'get-products', component: GetProductComponent, canActivate: [AuthGuard]},

  {path: 'update-product', component: UpdateProductComponent, canActivate: [AuthGuard]},

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
