import {Injectable} from "@angular/core";
import {Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {finyear} from "../../../globals/global-api";
import {College} from "../../../globals/global-api";
import {catchError, map} from "rxjs/operators";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class FinyearService_enc {

  constructor(private http: HttpClient) {

  }

  Finyear(): Observable<any> {

    return this.http.post<any>(finyear, '')
      .pipe(
        catchError(this.handleError)
      )
  }

  CollegeCode(): Observable<any> {
    return this.http.post<any>(College, '')
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    console.log("prakash error ", error)
    if (error.error !== null) {
      Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'})//alert
    } else {
      Swal.fire({title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK'})//alert
    }
    return throwError(error);

  }
}

