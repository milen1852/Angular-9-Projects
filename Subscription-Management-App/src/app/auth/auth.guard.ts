import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    
    if(this.authService.getAccessToken() || this.authService.getRefreshToken()){
      return true;
    }

    this.router.navigate(['/login'])
    return false;
  }
  
}
