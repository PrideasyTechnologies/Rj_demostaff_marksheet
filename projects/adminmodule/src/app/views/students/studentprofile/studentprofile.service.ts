import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import {
    BillDeskcheckSum,
    BillDeskcheckSumQuery,
    CheckAdmission_URL,
    CheckSubjectGroupQuota,
    EducationDocuments_URL,
    formfeesreceivedv1_url,
    GetEducationDetails,
    IU_Admission,
    IU_Reservations,
    IU_StudentEducation,
    IU_StudentProfile,
    PortalOpenv1,
    ProfileResources,
    ProfileSubmited,
    StudentBatch,
    StudentProfileStatus_url,
    StudentSubjectGroup,
    UploadDocuments,
    ValidatePortalmessage_URL,IsProfileSubmited_URL,
} from '../../../globals/global-api';

@Injectable({
    providedIn: 'root',
})
export class StudentprofileService implements HttpInterceptor {
    constructor(private http: HttpClient) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(catchError((error) => this.handleError(error)));
    }

    data: any;
    loginResponse: any;

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };
    httpOptionswithoutToken = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    httpOptionsFormdata = {
        headers: new HttpHeaders({
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };

    BillDeskTransactionPay(billdeskmsg: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(BillDeskcheckSum, JSON.stringify(billdeskmsg), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    BillDeskcheckSumQuery(billdeskquerymsg: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(
                BillDeskcheckSumQuery,
                JSON.stringify(billdeskquerymsg),
                httpFormOptions
            )
            .pipe(catchError(this.handleError));
    }

    CheckAdmission(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(CheckAdmission_URL, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    formfeesreceived(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(formfeesreceivedv1_url, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    ProfileSubmited(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(ProfileSubmited, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }



    AdmissionPayment(data: any): Observable<any> {

        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(IU_Admission, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    ProfileResources(): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(ProfileResources, '', httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    StudentBatch(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(StudentBatch, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    GetModalBatchSubjects(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(StudentSubjectGroup, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    CheckSubjectGroupQuota(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        // debugger;
        return this.http
            .post<any>(CheckSubjectGroupQuota, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    StudentProfileStatus(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(
                StudentProfileStatus_url,
                JSON.stringify(data),
                httpFormOptions
            )
            .pipe(catchError(this.handleError));
    }

    displayportalmessage(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        //debugger;
        return this.http
            .post<any>(
                ValidatePortalmessage_URL,
                JSON.stringify(data),
                httpFormOptions
            )
            .pipe(catchError(this.handleError));
    }

    // HttpClient API post() method => Create employee
    SavePersonalDetails(FormData: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(IU_StudentProfile, FormData, httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    SaveEducationDetails(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(IU_StudentEducation, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    EducationDocuments(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(EducationDocuments_URL, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    StudentUploadDocuments(documentsformData: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(UploadDocuments, documentsformData, httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    SaveReservationDetails(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };

        return this.http
            .post<any>(IU_Reservations, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    GetEducationDetails(data: any): Observable<any> {

        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(GetEducationDetails, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    PortalOpenv1(data: any): Observable<any> {
        let mytoken = sessionStorage.getItem('Token');
        let httpFormOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Token ' + mytoken,
            }),
        };
        return this.http
            .post<any>(PortalOpenv1, JSON.stringify(data), httpFormOptions)
            .pipe(catchError(this.handleError));
    }

    // Error handling
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error !== null) {
            Swal.fire({
                title: 'Message!',
                text: error.error.exception,
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert
        } else {
            Swal.fire({
                title: 'Error!',
                text: error.status + 'Server Error!',
                icon: 'error',
                confirmButtonText: 'OK',
            }); //alert
        }
        return throwError(error);
    }
}
