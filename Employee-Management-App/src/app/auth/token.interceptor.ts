// import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private refreshing = false;
  //Tells whether a refresh token request is already running

  private refreshSubject = new BehaviorSubject<string | null>(null);
  //Request Waits here, continues once a new token arrives

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Runs for every request  HttpRequest - outgoing request, HttpHandler - forwards request

    // ❌ Never intercept login / refresh
    if (req.url.includes('/api/token')) {
      return next.handle(req);
    }

    const accessToken = this.auth.getAccessToken();

    const requestWithToken = accessToken ? this.addToken(req, accessToken) : req;

    return next.handle(requestWithToken).pipe(
      catchError(error => {
        if (error.status === 401 && this.auth.getRefreshToken()) {
          return this.handleRefresh(req, next); // 🔥 PASS ORIGINAL REQUEST
        }
        return throwError(error);
      })
    );
  }

  private handleRefresh(
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.refreshing) {
      this.refreshing = true;
      this.refreshSubject.next(null);
      console.log("Refresh Token Handling")

      return this.auth.refreshToken().pipe(
        switchMap(tokens => {
          this.refreshing = false;
          console.log("refresh started");
          const newAccessToken = tokens.accessToken  || tokens.access_token;
          this.refreshSubject.next(newAccessToken);

          // ✅ Retry ORIGINAL request with NEW token
          return next.handle(
            this.addToken(originalRequest, newAccessToken)
          );
        }),
        catchError(err => {
          this.refreshing = false;
          console.log('Refresh Token FAILED → logout');
          this.auth.logout();
          return throwError(err);
        })
      );
    }

    return this.refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token =>
        next.handle(this.addToken(originalRequest, token!))
      )
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
}

