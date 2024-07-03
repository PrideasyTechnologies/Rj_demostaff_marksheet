import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Batchs, Sendbulkemail, Sendbulkemailfile} from '../globals/global-api';
import {Batchs_model} from "../models/request";


@Injectable({
  providedIn: 'root'
})
export class CommanService {
  constructor(private http: HttpClient) {
  }

  Batches(): Observable<any> {
    return this.http.post<Batchs_model>(Batchs, '');
  }

  Sendemail(): Observable<any> {
    return this.http.post<Batchs_model>(Batchs, '');
  }

  Sendbulkemail(jsonin: any): Observable<any> {
    return this.http.post<any>(Sendbulkemail, JSON.stringify(jsonin));
  }

  Sendbulkemailfile(jsonin: any): Observable<any> {
    return this.http.post<any>(Sendbulkemailfile, JSON.stringify(jsonin));
  }

}
