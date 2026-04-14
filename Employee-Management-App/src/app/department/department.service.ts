import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from './models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) { }

  getDepartments(){
    return this.http.get<Department[]>(`${this.baseUrl}/departments`)
  }
}
