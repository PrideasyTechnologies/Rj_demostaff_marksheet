import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CanceladmissionService {

  errorMessage : string = ""
  Exception : string = ""
  constructor(private http: HttpClient) {}

  // Http Options

  // HttpClient API post() method => Create employee

  //https://jasonwatmore.com/post/2022/11/08/angular-http-request-error-handling-with-the-httpclient

  // CancelRequestValidation(data): Observable<any> {
  //   //debugger;
  //   return this.http.post<any>(CancelRequestValidation , JSON.stringify(data) , this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      this.errorMessage = error.message;
      Swal.fire({
        title: 'Message!',
        text: error.error.exception,
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      Swal.fire({
        title: 'Error!',
        text: error.status + 'Server Error!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    }
    return throwError(error);
  }

  //https://jasonwatmore.com/post/2022/11/08/angular-http-request-error-handling-with-the-httpclient

}
