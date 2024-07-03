import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Paidfinyear, finyear, feedbackname_add, question_type,
  Batchs, documents, educationdetails, allbatchs, iu_updatedocus,} from '../../globals/global-api'
import Swal from "sweetalert2";
import {HTTP_json} from "../../globals/global-variable";
import {Easy_handleerror} from "../error/myerror.component";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
//
  constructor(private http: HttpClient) { }
//
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token"),
    })
  }

  httpOptionsFormdata = {
    headers: new HttpHeaders({
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };
//

  question_type(): Observable<any> {
    //debugger;
    return this.http.post<any>(question_type, '', HTTP_json)
      .pipe(
        catchError(error => {
          return Easy_handleerror.Showerror(error);
        })
      )
  }
//

  feedbackname_add(jsonin: any): Observable<any> {
    return this.http
      .post<any>(feedbackname_add, JSON.stringify(jsonin), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  Batches(): Observable<any> {
    return this.http.post<any>(Batchs, '', HTTP_json)
        .pipe(
            catchError(this.handleError)
        );
  }

  documents(): Observable<any> {
    return this.http.post<any>(documents, '', HTTP_json)
        .pipe(
            catchError(this.handleError)
        );
  }

  educationdetails(): Observable<any> {
    return this.http.post<any>(educationdetails, '', HTTP_json)
        .pipe(
            catchError(this.handleError)
        );
  }

  allbatchs(): Observable<any> {
    return this.http.post<any>(allbatchs, '', HTTP_json)
        .pipe(
            catchError(this.handleError)
        );
  }

  iu_updatedocus(): Observable<any> {
    return this.http.post<any>(iu_updatedocus, '', HTTP_json)
        .pipe(
            catchError(this.handleError)
        );
  }

//
//
  handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error)

    if (error.error == null) {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    return throwError(error);
  }
}
