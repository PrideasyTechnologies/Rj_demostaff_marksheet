import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse,} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {
  Captch, Captchimage, Feeslogin,
} from "../../../globals/global-api";
import {Singlebatch, Validatelogin} from "../../../models/request";
import Swal from "sweetalert2";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    errorMessages: any;

    formRules = {
        nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
        // aadhaarMin: 12,
        // aadhaarMax: 12,
        passwordMin: 6,
        passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
        capchamin: 6,
    };

    formErrors = {
        aadhaar: 'number',
        password: '',
        capcha: '',
    };

    constructor(private http: HttpClient) {
        this.formerrormessage();
    }

    formerrormessage() {
        this.errorMessages = {
            aadhaar: {
                required: 'Aaadhaar is required',
              // aadhaarMin: `Password must be at least ${this.formRules.aadhaarMin} characters`,
              // aadhaarMax: `Password must be at least ${this.formRules.aadhaarMax} characters`
            },
            password: {
                required: 'Password is required',
                pattern: 'Password must contain: numbers, uppercase and lowercase letters',
                minLength: `Password must be at least ${this.formRules.passwordMin} characters`
            },
            capcha: {
                required: 'Capcha is required',
            },
        }
    }


    Feeslogin(jsonin: Validatelogin): Observable<any> {
        return this.http.post<any>(Feeslogin, jsonin).pipe(
          catchError(this.handleError)
        )
    }


    GetCaptcha(): Observable<any> {
        return this.http.post<any>(Captch, '')
    }

  GetCaptchaImage(): Observable<any> {
    return this.http.post<any>(Captchimage, '')
  }


  handleError(error: HttpErrorResponse): Observable<any> {


    if (error.error !== null) {
      Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK'})//alert
    } else {
      Swal.fire({title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK'})//alert

    }
    return throwError(error);
  }

}
