import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes("/api/token")){
      return next.handle(request);
    }

    const accessToken = this.authService.getAccessToken();

    if(accessToken){
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}`}
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
