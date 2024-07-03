// import { Injectable } from '@angular/core';
// import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
// import { AuthService } from './authservice';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class AuthGuardMaintenance implements CanActivate {
//
//     constructor(
//         private authService: AuthService, private router: Router
//     ) {}
//
//     canActivate(): Observable<boolean> | Promise<boolean> | boolean {
//         if (this.authService.inMaintenance()) {
//             alert('This Site Is Still Under Maintenance')
//             this.router.navigate(['/maintenance']);
//             return false;
//         } else {
//             this.router.navigate(['/']);
//             return true;
//         }
//     }
//
// }
