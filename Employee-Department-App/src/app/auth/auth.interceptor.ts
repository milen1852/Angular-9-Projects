import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  private refreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(request.url.includes("/api/token"))
      return next.handle(request);

    const accessToken = this.authService.getAccessToken();

    const requestWithToken = accessToken ? this.addToken(request, accessToken): request;

    return next.handle(requestWithToken).pipe(
      catchError(error => {
        if(error.status === 401 && this.authService.getRefreshToken()){
          return this.handleRefresh(request, next);
        }
        return throwError(error);
      } )
    )

  }

  private handleRefresh(originalRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.refreshing){
      this.refreshing = false;
      this.refreshSubject.next(null);

      return this.authService.refreshToken().pipe(

        switchMap(tokens => {
          this.refreshing = false;

          const newAccessToken = tokens.access_token;
          this.refreshSubject.next(newAccessToken);

          return next.handle(
            this.addToken(originalRequest, newAccessToken)
          )
        }),

        catchError(error => {
          this.refreshing = false;
          this.authService.logout();
          return throwError(error);
        })
      )
    }

    return this.refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => 
        next.handle(this.addToken(originalRequest, token!))
      )
    )
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
}
