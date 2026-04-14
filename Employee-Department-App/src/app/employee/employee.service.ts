import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8081/api'

  constructor(private http: HttpClient) { }

  getEmployees(spec: any) {
    return this.http.post<any>(`${this.baseUrl}/employees`, spec);
  }

  addEmployee(employee: any) {
    return this.http.post<any>(`${this.baseUrl}/employee`, employee);
  }

  getStatus() {
    return this.http.get<string[]>(`${this.baseUrl}/employee/meta/status`);
  }

  getEmployeeById(empId: number, email: string): any{
    return this.http.get(`${this.baseUrl}/employee/${empId}/${encodeURIComponent(email)}`)
  }

  private selectedEmployee: any;

  setSelectedEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  getSelectedEmployee() {
    return this.selectedEmployee;
  }

  updateEmployee(empId: number, email: string, employee: any) {
    // const empId = employee.key.empId;
    // const email = employee.key.email;

    return this.http.put<any>(`${this.baseUrl}/employee/${empId}/${encodeURIComponent(email)}`, employee);
  }

  deleteEmployee(empId: number, email: string) {

    return this.http.delete<any>(`${this.baseUrl}/employee/${empId}/${encodeURIComponent(email)}`)
  }
}
