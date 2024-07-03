import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  AdmissionApproval,
  Batchs,
  FormFeesPaid,
  Marksheetapprovallist,
  printmarksheet,
  studentsmarksheetlist,
  UpdateDocumentApproval
} from '../../globals/global-api';
import Swal from 'sweetalert2';
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
export class MarksheetApprovalService {
  dataUrl = 'assets/data-tables.json';

  constructor(private http: HttpClient) {
  }

  // Error handling

}
