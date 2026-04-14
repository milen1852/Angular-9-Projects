import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8081/products/token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log('Calling backend /products/token');
    return this.http.post(this.loginUrl, {
      username: username,
      password: password
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
