import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8081/api/user';

  getStatus() {

    return this.http.get<string[]>(`${this.baseUrl}/enum/status`);
  }

  getCreatedBy() {

    return this.http.get<string[]>(`${this.baseUrl}/enum/createdBy`);
  }

  addUser(user: User) {

    return this.http.post(this.baseUrl, user);
  }
}
