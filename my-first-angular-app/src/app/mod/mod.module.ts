import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent, 
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ModModule { }
