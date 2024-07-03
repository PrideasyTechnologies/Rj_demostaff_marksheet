import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EligiblelistService {

  // data:any;
  constructor(private http: HttpClient) {
  }

}
