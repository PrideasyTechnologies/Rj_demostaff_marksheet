import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class AuthService{

    constructor(private router: Router) { }

    // inMaintenance() {
    //     return false;
    // }

    getFinyear(): number {
        let finyear : number = 0 ;
        finyear = parseInt(sessionStorage.getItem('Finyear')!);
        if (finyear <= 0) {
            this.router.navigate(['/login']);
        }
        return finyear ;
    }
    getAuthToken():string {
      const userToken = sessionStorage.getItem('token');
      return userToken !== null ? userToken : ''
    }

    getLoginaadhaar(): number {
        let aadhaar : number = 0 ;
        aadhaar = parseInt(sessionStorage.getItem('Aadhaar')!);
        if (aadhaar <= 0) {
            this.router.navigate(['/login']);
        }
        return aadhaar;
    }
    getCollege(): number {
        let college : number = 0 ;
        college = parseInt(sessionStorage.getItem('College')!) ;
        if (college <= 0) {
            this.router.navigate(['/login']);
        }
        return college
    }
}
