import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

  
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    const excludedUrls = ['/auth/login', '/auth/register'];
    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    let authReq = req;

  
  
if (token) {
  authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}


    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
       
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}