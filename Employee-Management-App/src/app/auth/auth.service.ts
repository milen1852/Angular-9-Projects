import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl, { username, password })
      .pipe(tap(res => this.saveTokens(res)));
  }

  refreshToken() {
    const refresh = this.getRefreshToken();
    console.log("Refresh Token")
    if (!refresh) {
      console.log("Refresh Token Error");
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<any>(`${this.baseUrl}/refresh`, { refreshToken: refresh })
      .pipe(tap(res => this.saveTokens(res)));
  }

  saveTokens(tokens: any) {
    localStorage.setItem('access_token', tokens.accessToken || tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refreshToken || tokens.refresh_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  logout() {
    const refreshToken = localStorage.getItem('refresh_token');

    return this.http.post<any>(`${this.baseUrl}/logout`, {refreshToken});
  }

  /** Defensive check */
  isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

