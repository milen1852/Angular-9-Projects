import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getEmployees(spec: any) {
    console.log(spec)
    return this.http.post<any>(`${this.baseUrl}/employees`, spec)
  }

  addEmployee(data: any) {
    return this.http.post(`${this.baseUrl}/employee`, data);
  }

  getStatus() {
    return this.http.get<string[]>(`${this.baseUrl}/employee/meta/status`);
  }

  updateEmployee(employee: any) {
    const empId = employee.key.empId;
    const email = employee.key.email;

    return this.http.put(`${this.baseUrl}/employee/${empId}/${encodeURIComponent(email)}`, employee);
  }

  deleteEmployee(employee: any) {
    const empId = employee.key.empId;
    const email = employee.key.email;

    return this.http.delete(`${this.baseUrl}/employee/${empId}/${encodeURIComponent(email)}`);
  }

  getEmployeeWithDepartment(empId: number, email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${empId}/${encodeURIComponent(email)}`);
  }

  private selectedEmployee: any;

  setSelectedEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  getSelectedEmployee() {
    return this.selectedEmployee;
  }
}
