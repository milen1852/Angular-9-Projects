import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { GetProductsComponent } from './get-products/get-products.component';
import { LoginComponent } from './login/login.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { GetProductsComponent } from './get-products/get-products.component';
// import { AddProductComponent } from './add-product/add-product.component';
// import { UpdateProductComponent } from './update-product/update-product.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'get', component: GetProductsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'update', component: UpdateProductComponent, canActivate: [AuthGuard]},
  {path: 'delete', component: DeleteProductComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
