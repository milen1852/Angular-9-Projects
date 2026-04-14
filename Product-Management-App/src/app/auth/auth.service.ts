import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8081/api/token"

  login(user){
    return this.http.post(`${this.baseUrl}/login`, user)
    .pipe(tap(result => this.saveTokens(result)));
  }

  saveTokens(tokens: any){
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  }

  getAccessToken(): string | null{
    return localStorage.getItem("access_token")
  }

  getRefreshToken(): string | null{
    return localStorage.getItem("refresh_token");
  }

  logout(){

    const refreshToken = this.getRefreshToken();

    return this.http.post(`${this.baseUrl}/logout`, {refreshToken});
  }
}
