import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {Batchs, Sendbulkemail, Sendbulkemailfile} from '../globals/global-api';
import {Batchs_model} from '../models/response';
import {catchError} from "rxjs/operators";
import {HTTP_form, HTTP_json} from "./global-variable";
import Swal from "sweetalert2";
import { encryptUsingAES256 } from './encryptdata';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  Batches(): Observable<any> {
    return this.http.post<Batchs_model>(Batchs, '');
  }

  Post_json(apiname: string, jsonin: any): Observable<any> {
    let input_json = {
      Input : encryptUsingAES256(jsonin)
    };

    return this.http
      .post<any>(apiname, input_json, HTTP_json)
      .pipe(catchError(this.handleError));
  }

  Post_json_withouttoken(apiname: string, jsonin: any): Observable<any> {
    return this.http
      .post<any>(apiname, jsonin, { headers: { 'Anonymous': 'no' } })
      .pipe(catchError(this.handleError));
  }

  Post_formdata(apiname: string, FormData: any): Observable<any> {
    return this.http
      .post<any>(apiname, FormData, HTTP_form)
      .pipe(catchError(this.handleError));
  }

  Post_formdata_withouttoken(apiname: string, jsonin: any): Observable<any> {
    return this.http
      .post<any>(apiname, jsonin, { headers: { 'Anonymous': 'no' } })
      .pipe(catchError(this.handleError));
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    console.log("exception error :", error);
    if (error.error !== null) {
      console.log("exception error xxxx:", error.error);
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
    return throwError(() => {
      return error;
    });
  }
}
