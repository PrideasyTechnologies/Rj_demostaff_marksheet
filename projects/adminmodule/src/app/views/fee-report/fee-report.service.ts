import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FeeReportService implements HttpInterceptor {
  authKey!: string;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({

      setHeaders: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    });
    return next.handle(authReq);
  }

  //
  constructor(private http: HttpClient) {
  }


}
