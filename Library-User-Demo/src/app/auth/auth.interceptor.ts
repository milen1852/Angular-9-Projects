import { Injectable } from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import {
   catchError,
   filter,
   switchMap,
   take
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   private refreshing = false;
   private refreshSubject = new BehaviorSubject<string | null>(null);

   constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (request.url.includes('/api/token')) {
         return next.handle(request);
      }

      const accessToken = this.authService.getAccessToken();
      const authRequest = accessToken ? this.addToken(request, accessToken) : request;

      return next.handle(authRequest).pipe(
         catchError(error => {
            if (error.status === 401 && this.authService.getRefreshToken()) {
               return this.handleRefresh(authRequest, next);
            }
            return throwError(error);
         })
      );
   }

   private handleRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (!this.refreshing) {
         this.refreshing = true;
         this.refreshSubject.next(null);

         return this.authService.refreshToken().pipe(

            switchMap(tokens => {
               this.refreshing = false;

               const newAccessToken = tokens.access_token;
               this.refreshSubject.next(newAccessToken);

               return next.handle(
                  this.addToken(request, newAccessToken)
               );
            }),

            catchError(() => {
               this.refreshing = false;
               return this.forceLogout();
            })
         );
      }

      return this.refreshSubject.pipe(
         filter(token => token !== null),
         take(1),
         switchMap(token =>
            next.handle(this.addToken(request, token))
         )
      );
   }

   private forceLogout(): Observable<never> {
      return this.authService.logout().pipe(
         catchError(() => {
            return throwError(() => 'Logout failed');
         }),
         switchMap(() => {
            this.authService.clearTokens();
            this.router.navigate(['/login']);
            this.toastr.success("Logged Out Successfully")
            return throwError(() => 'Session expired');
         })
      );
   }

   private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
      return request.clone({
         setHeaders: {
            Authorization: `Bearer ${token}`
         }
      });
   }
}
