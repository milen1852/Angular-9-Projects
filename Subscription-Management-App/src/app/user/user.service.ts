import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './models/user.model';
import { Observable } from 'rxjs';
import { PageResponse } from './models/pageResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8081/api"

  getPlanTypes(): Observable<string[]> {

    return this.http.get<string[]>(`${this.baseUrl}/user/enum/planType`)
  }

  getStatus() {
    
    return this.http.get<string[]>(`${this.baseUrl}/user/enum/status`)
  }

  addUser(user: Users) {

    return this.http.post(`${this.baseUrl}/user`, user)
  }

  getAllUsers(specRequest): Observable<PageResponse<Users>> {

    return this.http.post<PageResponse<Users>>(`${this.baseUrl}/users`, specRequest)
  }

  getUser(userId: number){
    
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  private selectedUser: any;

  setSelectedUser(user){
    this.selectedUser = user;
  }

  getSelectedUser(){
    return this.selectedUser;
  }

  udpateUser(user: Users){
    const userId = user.userId;
    const firstName = user.firstName;
    const email = user.email;

    return this.http.put(`${this.baseUrl}/user/${userId}/${firstName}/${encodeURIComponent(email)}`, user)
  }

  deleteUser(userId: number, firstName: string, email: string ){

    return this.http.delete(`${this.baseUrl}/user/${userId}/${firstName}/${encodeURIComponent(email)}`);
  }
}
