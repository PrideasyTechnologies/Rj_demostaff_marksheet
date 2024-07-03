//https://www.cloudsigma.com/managing-http-requests-and-error-handling-with-angular-interceptors/
import {Injectable} from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {AuthService} from './authservice';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private datepipe: DatePipe) {
  }

  //https://www.bezkoder.com/logout-when-token-expired-angular-14/
  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // console.log(expiry*1000);
    // console.log(Date.now());
    return expiry * 1000 > Date.now();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');

    // const token = this.authService.getAuthToken();
    //
    // // if (this.isTokenExpired(token)) {
    // //   console.log("Expired");
    // //   this.router.navigate(['/login']);
    // // }
    //
    //
    // if (token) {
    //   request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    // } else {
    //   //this.router.navigate(['/login']);
    // }

    if (request) {
      const token = this.authService.getAuthToken();
      if (token) {
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token),
        });

      } else {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    }


    if (!request.headers.has('Content-Type')) {
      ///request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    //request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        Swal.fire({
          title: 'Message!',
          text: error.error.exception,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return throwError(() => error);
      }));


  }
}
