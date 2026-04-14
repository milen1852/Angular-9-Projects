import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/token';

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, user)
      .pipe(tap(tokens => this.saveTokens(tokens)));
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();

    return this.http.post<any>(`${this.baseUrl}/refresh`, { refreshToken })
      .pipe(tap(tokens => this.saveTokens(tokens)));
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  saveTokens(tokens: any) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  logout() {
    const refreshToken = this.getRefreshToken();

    return this.http.post(`${this.baseUrl}/logout`, { refreshToken });
  }
}
