import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface IUserData {
  name: string;
  email: string;
  regDate: string;
  city: string;
  age: number;

}

@Injectable()
export class AdmissionReleaseService {

  constructor(private http: HttpClient) {
  }

}
