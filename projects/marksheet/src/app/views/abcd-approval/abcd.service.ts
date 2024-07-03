import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry, window} from 'rxjs/operators';
import {
  AdmissionStatusreport,
  Admissionstatusnep,
  Batchs, studentabcdid_get,
  studentabcdid_list,
  BilldeskStatusReport,
  studentabcdid_approval, studentabcdid_rejectionlist, studentabcdid_download
} from '../../globals/global-api';
import {HTTP_json} from "../../globals/global-variable";


export interface IUserData {
    name: string;
    email: string;
    regDate: string;
    city: string;
    age: number;
}

export interface ITableData extends Array<IUserData> {
}

@Injectable()
export class AbcdFormService {
    dataUrl = 'assets/data-tables.json';

    constructor(private http: HttpClient) {
    }


    // Error handling
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error !== null) {
            alert(error.error.exception);
        } else {
            alert(error.status + 'Server Error!');

        }
        return throwError(error);
    }


    // ServerIP = 'http://114.79.184.110:7000';
    // Batchs='/v1/Common/Batchs';

    // Http Options


    Batches(): Observable<any> {
        return this.http.post<any>(Batchs, '', HTTP_json)
            .pipe(
                catchError(this.handleError)
            );
    }

    // BilldeskStatusReport(date: any): Observable<any> {
    //     // @ts-ignore
    //     return this.http.post<any>(BilldeskStatusReport, JSON.stringify(date), HTTP_json)
    //         .pipe(
    //             catchError(this.handleError)
    //         );
    // }

    AdmissionStatusreport(jsonin: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(AdmissionStatusreport, JSON.stringify(jsonin), HTTP_json)
            .pipe(
                catchError(this.handleError)
            );
    }

    studentabcdid_list(jsonin: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(studentabcdid_list, JSON.stringify(jsonin), HTTP_json)
            .pipe(
                catchError(this.handleError)
            );
    }

  studentabcdid_download(download: any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(studentabcdid_download, JSON.stringify(download), HTTP_json)
      .pipe(
        catchError(this.handleError)
      );
  }

    studentabcdid_approval(jsonin: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(studentabcdid_approval, JSON.stringify(jsonin), HTTP_json)
            .pipe(
                catchError(this.handleError)
            );
    }
    studentabcdid_get(jsonin: any): Observable<any> {
        return this.http.post<any>(studentabcdid_get, JSON.stringify(jsonin), HTTP_json)
            .pipe(
                catchError(this.handleError)
            )
    }

    Admissionstausnep(jsonin: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(Admissionstatusnep, JSON.stringify(jsonin), HTTP_json)
            .pipe(
                catchError(this.handleError)
            );
    }

  studentabcdid_rejectionlist(): Observable<any> {
    //debugger;
    return this.http.post<any>(studentabcdid_rejectionlist, '', HTTP_json)
      .pipe(
        catchError(this.handleError)
      )
  }
}
