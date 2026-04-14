import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = "http://localhost:8082/api"

  constructor(private http: HttpClient) { }

  getDepartments(spec: any){
    return this.http.post<any>(`${this.baseUrl}/departments`, spec)
  }

  addDepartment(department: any){
    return this.http.post<any>(`${this.baseUrl}/department`, department);
  }

  getDepartmentById(deptId: number){
    return this.http.get(`${this.baseUrl}/department/${deptId}`)
  }

  updateDepartment(department: any){
    const deptId = department.deptId;

    return this.http.put<any>(`${this.baseUrl}/department/${deptId}`, department);
  }

  deleteDepartment(department: any){
    const deptId = department.deptId;

    return this.http.delete<any>(`${this.baseUrl}/department/${deptId}`);
  }

  private selectedDepartment: any;

  setSelectedDepartment(department: any){
    this.selectedDepartment = department;
  }

  getSelectedDepartment(){
    return this.selectedDepartment;
  }
}
