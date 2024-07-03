import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Batchs, AdmissionApproval, AdmissionApprovallist, ViewDocument,
  EducationDetails, EducationDocuments, AdmissionMarksheets, UpdateDocumentApproval } from '../../globals/global-api'
import {HTTP_json} from "../../globals/global-variable";


export interface IUserData {
  name: string;
  email: string;
  regDate: string;
  city: string;
  age: number;

}

export interface ITableData extends Array<IUserData> { }

@Injectable()
export class StudentsApprovalService {
  dataUrl = 'assets/data-tables.json';

  constructor(private http: HttpClient) { }

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


  // ServerIP = 'http://114.79.184.110:7000';
  // Batchs='/v1/Common/Batchs';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token")
    })
  }


  AdmissionApprovallist(checked: any): Observable<any> {
    return this.http.post<any>(AdmissionApprovallist, JSON.stringify(checked), HTTP_json)
      .pipe(
        catchError(this.handleError)
      )
  }



}
