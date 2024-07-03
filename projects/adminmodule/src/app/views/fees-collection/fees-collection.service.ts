import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


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
export class FeesCollectionService {
  dataUrl = 'assets/data-tables.json';

  constructor(private http: HttpClient) {
  }

  // Error handling

}
