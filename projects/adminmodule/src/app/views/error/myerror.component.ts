import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import Swal from "sweetalert2";


export class Easy_handleerror {

  constructor() {}

  static Showerror(error: HttpErrorResponse) : Observable<any> {

    // console.log("my error" , error.message)

    if (error.error !== null) {
      Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert
    }


    return throwError(error);
  }

}
