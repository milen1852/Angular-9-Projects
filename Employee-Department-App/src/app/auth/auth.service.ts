import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<any>(this.baseUrl, {username, password}).pipe(tap(res => this.saveTokens(res)));
  }

  refreshToken(){
    const refreshToken = this.getRefreshToken();

    if(!refreshToken){
      console.log("Refresh Token Error");

      return throwError(() => new Error('No Refresh Token'))
    }

    return this.http.post<any>(`${this.baseUrl}/refresh`, {refreshToken})
    .pipe(tap(result => this.saveTokens(result)));
  }

  saveTokens(tokens: any){
    localStorage.setItem("access_token", tokens.access_token || tokens.accessToken)
    localStorage.setItem("refresh_token", tokens.refresh_token || tokens.refreshToken)
  }

  getAccessToken(): string | null {
    return localStorage.getItem("access_token")
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token")
  }

  logout(){
    const refreshToken = localStorage.getItem("refresh_token")

    return this.http.post<any>(`${this.baseUrl}/logout`, {refreshToken});
  }
}
