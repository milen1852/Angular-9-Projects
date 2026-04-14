import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = {
    username : "admin",
    password : "admin123",
    name : "John Ciju",
    address : "123, MG Road",
    city: "Banglore",
    phone: "9876543201"
  };

  login(username: string, password: string): boolean {
    if (username === this.user.username && password === this.user.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));
      return true;
    }
    else if(username === '' || password === ''){
      alert("Enter both Username and Password");
      return;
    }  
    return false;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  constructor() { }
}
