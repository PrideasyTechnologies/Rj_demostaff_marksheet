import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {
  Batchs,
  CurrentSubjectGroupCode,
  IU_UpdateSubjectGroupCode,
  AdmissionQuotaList,
  IU_QuotaStatusUpdate, AdmissionQuotaList_minor, IU_minorstatus
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
export class SubjectQuotaService {
  dataUrl = 'assets/data-tables.json';

  constructor(private http: HttpClient) {
  }

  // Error handling

}
