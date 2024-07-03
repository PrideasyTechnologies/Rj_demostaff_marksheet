import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { studentsforgotmobile, ValidateOTP } from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  mobileNo : number = 0 ;
  Aadhaar : number = 0 ;
  constructor() { }

  otpResponse: any;
  data: any;

  setValue(value: any) {
    this.otpResponse = value;
    this.valuefromService(this.otpResponse);
  }

  valuefromService(otpValue: any){
    this.data = otpValue;
  }



}
