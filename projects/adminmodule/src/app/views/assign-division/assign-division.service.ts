import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SubjectQuotaService {
  dataUrl = 'assets/data-tables.json';

  constructor(private http: HttpClient) {
  }

  download(url: any): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

}
