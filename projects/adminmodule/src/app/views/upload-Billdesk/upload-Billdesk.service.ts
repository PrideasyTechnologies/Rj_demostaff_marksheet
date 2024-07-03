import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable, Subject, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Batchs, BilldeskUpload, billdeskdataupload,
  billdeskdatadownload, billdeskrefundupload, billdeskrefunddownload } from '../../globals/global-api'
import {HTTP_form, HTTP_json} from "../../globals/global-variable";


export interface IUserData {
  name: string;
  email: string;
  regDate: string;
  city: string;
  age: number;

}

export interface ITableData extends Array<IUserData> { }

@Injectable()
export class BillDeskService {
  dataUrl = 'assets/data-tables.json';

  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {

    this.userLoggedIn.next(false);
  }


  // Error handling


  // ServerIP = 'http://114.79.184.110:7000';
  // Batchs='/v1/Common/Batchs';

  // Http Options


  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

}
