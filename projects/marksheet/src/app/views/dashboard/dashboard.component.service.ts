import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry, window} from 'rxjs/operators';
import {AdmissionStatusreport, Admissionstatusnep, Batchs, BilldeskStatusReport} from '../../globals/global-api';


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
export class DashboardService {
    dataUrl = 'assets/data-tables.json';

    constructor(private http: HttpClient) {
    }

    getData() {
        return this.http.get<ITableData>(this.dataUrl).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
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
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('Token')
        })
    };

    Batches(): Observable<any> {
        return this.http.post<any>(Batchs, '', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    BilldeskStatusReport(date: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(BilldeskStatusReport, JSON.stringify(date), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    AdmissionStatusreport(report: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(AdmissionStatusreport, JSON.stringify(report), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    Admissionstausnep(report: any): Observable<any> {
        // @ts-ignore
        return this.http.post<any>(Admissionstatusnep, JSON.stringify(report), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

}
