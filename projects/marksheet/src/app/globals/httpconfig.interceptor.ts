//https://www.cloudsigma.com/managing-http-requests-and-error-handling-with-angular-interceptors/
import {Injectable} from '@angular/core';

import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {AuthService} from './authservice';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private datepipe: DatePipe
    ) {
    }

    //https://www.bezkoder.com/logout-when-token-expired-angular-14/

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let currentDateTime = this.datepipe.transform(
            new Date(),
            'MM/dd/yyyy h:mm:ss'
        );

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

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) {

                    const body = event.body;
                    console.log('event--->>>', body );
                    // Check if the response starts with "while(1);", remove it if present
                    if (typeof body === 'string' && body.startsWith('while(1);')) {
                        return event.clone({ body: JSON.parse(body.substring(8)) });
                    }

                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason:
                        error && error.error && error.error.reason
                            ? error.error.reason
                            : '',
                    status: error.status,
                };
                Swal.fire({
                    title: 'Message!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return throwError(() => error);
            })
        );
    }

    private modifyBody(body: any) {
        if (body.while) {
            console.log("yes")
            delete body.while;
        }

        /*
        if (event.body.while) {
                        console.log("found")
                        delete event.body.while;
                    }
         */
    }

}
