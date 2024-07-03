import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeavingCertificateService {

  // data:any;
  constructor(private http: HttpClient) {
  }

}
