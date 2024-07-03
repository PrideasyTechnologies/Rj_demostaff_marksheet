import {Injectable} from '@angular/core';
import {
  getemployee,
  getorginazation, HTTP_form,
  HTTP_json, documenttype,
  inwardoutward,
  iu_inwardoutward, inwardoutward_20,
  iu_orgnization,
  orgtype, moduletype
} from '../../globals/global-variable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';
import {Easy_handleerror} from '../error/myerror.component';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InwardoutwardService {

  constructor(private http: HttpClient) {
  }


  Moduletype(): Observable<any> {
    //debugger;
    return this.http.post<any>(moduletype, '', HTTP_json)
      .pipe(
        catchError(error => {
          return Easy_handleerror.Showerror(error);
        })
      )
  }

  inwardoutward(jsonin: any): Observable<any> {
    //debugger;
    const sJson = JSON.stringify(jsonin)
    return this.http.post<any>(inwardoutward, sJson, HTTP_json)
      .pipe(
        catchError(error => {
          return Easy_handleerror.Showerror(error);
        })
      )
  }
}
