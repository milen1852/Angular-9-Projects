import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './todo/tasks/tasks.component';
import { LoginTaskComponent } from './login-task/login-task.component';
import { ProductsComponent } from './todo/products/products.component';
import { ProductViewComponent } from './todo/product-view/product-view.component';


const routes: Routes = [
  {path: "tasks", component: TasksComponent},
  {path: "login-task", component: LoginTaskComponent},
  {path: "products", component: ProductsComponent},
  {path: "products/:id", component: ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
