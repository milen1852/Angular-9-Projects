import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() : boolean {

    if(this.authService.getAccessToken() || this.authService.getRefreshToken()){
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
  
}
