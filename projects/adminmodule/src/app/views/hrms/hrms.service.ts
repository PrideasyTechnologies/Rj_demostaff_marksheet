import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HrmsService {

  constructor(private http: HttpClient) {
  }

}
