import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AdminReportService  {
  authKey!: string;

  constructor(private http: HttpClient) {
  }

}
