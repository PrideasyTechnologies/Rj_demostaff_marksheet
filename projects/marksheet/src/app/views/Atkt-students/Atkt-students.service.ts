import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { atkt_formamount } from '../../globals/global-api';
import { HTTP_json } from '../../globals/global-variable';

@Injectable({
  providedIn: 'root',
})
export class AtktStudentsService {
  // data:any;
  constructor(private http: HttpClient) {}

  

  // Error handling

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      window.alert(error.error.exception)
    }
    else {
      window.alert(error.status + "Server Error!")

    }
    return throwError(error);
  }

  // Http Options

  atkt_formamount(): Observable<any> {
    return this.http.post<any>(atkt_formamount,'', HTTP_json)
      .pipe(
        catchError(this.handleError)
      )
  }

}
