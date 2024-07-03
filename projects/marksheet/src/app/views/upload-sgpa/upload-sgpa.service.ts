import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  Batchs,
  batchsemstersubjectpaper,
  batchsemstersubjectpapertype,
  batchsubjectgroup,
  batchuserexam,
  deletestudentsgpa,
  download_examsgpa,
  editstudentsgpa,
  exceldownloadsgpa,
  exceluploadsgpa,
  showoverallgrade,
  updateaadhaargrade,
  updatesinglesgpa,
  upload_examsgpa,
  viewstudentsgpa,
  templatename,
  semester, sgpa, iu_sgpa, delete_sgpa,upload_sgpa,download_sgpa,
} from '../../globals/global-api'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UploadSgpaService {

  // data:any;
  constructor(private http: HttpClient) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token"),
    })
  }
  httpOptionsFormdata = {
    headers: new HttpHeaders({
      'Authorization': "Token " + sessionStorage.getItem("Token")
    })
  }


  download(url: any): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  showoverallgrade(download: any): Observable<any> {
    return this.http.post<any>(showoverallgrade, JSON.stringify(download), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateaadhaargrade(download: any): Observable<any> {
    return this.http.post<any>(updateaadhaargrade, JSON.stringify(download), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Batches(): Observable<any> {
  //   return this.http.post<any>(Batchs, '', this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  batchuserexam(viewsubject: any): Observable<any> {
    return this.http.post<any>(batchuserexam, JSON.stringify(viewsubject), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  batchsubjectgroup(semsubject: any): Observable<any> {
    return this.http.post<any>(batchsubjectgroup, JSON.stringify(semsubject), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  batchsemstersubjectpaper(papercode: any): Observable<any> {
    return this.http.post<any>(batchsemstersubjectpaper, JSON.stringify(papercode), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  batchsemstersubjectpapertype(papertype: any): Observable<any> {
    return this.http.post<any>(batchsemstersubjectpapertype, JSON.stringify(papertype), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  exceldownloadsgpa(downloadfile: any): Observable<any> {
    return this.http.post<any>(exceldownloadsgpa, JSON.stringify(downloadfile), this.httpOptions)
      .pipe(
        // catchError(this.handleError)
      )
  }

  download_examsgpa(downloadfile: any): Observable<any> {
    return this.http.post<any>(download_examsgpa, JSON.stringify(downloadfile), this.httpOptions)
      .pipe(
        // catchError(this.handleError)
      )
  }

  viewstudentsgpa(downloadfile: any): Observable<any> {
    return this.http.post<any>(viewstudentsgpa, JSON.stringify(downloadfile), this.httpOptions)
      .pipe(
        // catchError(this.handleError)
      )
  }
    templatename(): Observable<any> {
        return this.http
            .post<any>(templatename, '', this.httpOptions)
            .pipe(catchError(this.handleError));
    }

  semester(exam: any): Observable<any> {
        return this.http
            .post<any>(semester, JSON.stringify(exam), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
  editstudentsgpa(update: any): Observable<any> {
    return this.http.post<any>(editstudentsgpa, JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deletestudentsgpa(downloadfile: any): Observable<any> {
    return this.http.post<any>(deletestudentsgpa, JSON.stringify(downloadfile), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  exceluploadsgpa(FormData: any): Observable<any> {
    return this.http.post<any>(exceluploadsgpa, FormData, this.httpOptionsFormdata)
      .pipe(
        catchError(this.handleError)
      )
  }

  upload_examsgpa(FormData: any): Observable<any> {
    return this.http.post<any>(upload_examsgpa, FormData, this.httpOptionsFormdata)
      .pipe(
        catchError(this.handleError)
      )
  }

  updatesinglesgpa(update: any): Observable<any> {
    return this.http.post<any>(updatesinglesgpa, JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  show_outsidesgpa(jsonin: any): Observable<any> {
    return this.http.post<any>(sgpa, JSON.stringify(jsonin), this.httpOptions)
        .pipe(
            catchError(this.handleError)
        )
  }

  addetails(jsonin: any): Observable<any> {
    return this.http.post<any>(iu_sgpa, JSON.stringify(jsonin), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  Updatedetails(jsonin: any): Observable<any> {
    return this.http.post<any>(iu_sgpa, JSON.stringify(jsonin), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  sgpaupload(FormData: any): Observable<any> {
    return this.http.post<any>(upload_sgpa, FormData, this.httpOptionsFormdata)
        .pipe(
            catchError(this.handleError)
        )
  }

  sgpadownload(downloadfile: any): Observable<any> {
    return this.http.post<any>(download_sgpa, JSON.stringify(downloadfile), this.httpOptions)
        .pipe(
            catchError(this.handleError)
        )
  }

    deletedetails(jsonin: any): Observable<any> {
    return this.http.post<any>(delete_sgpa, JSON.stringify(jsonin), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({title: 'Error!', text: error.error.exception, icon: 'error',
        confirmButtonText: 'OK'})//alert
    } else {
      Swal.fire({title: 'Error!', text: error.status + "Server Error!", icon: 'error',
        confirmButtonText: 'OK'})//alert

    }
    return throwError(error);
  }


}
