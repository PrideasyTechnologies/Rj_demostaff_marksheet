import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeavingCertificateComponent } from './leaving-certificate.component';


const routes: Routes = [
  {
    path: '',
    component: LeavingCertificateComponent,
    data: {
      title: 'Leavingcertificate',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavingCertificateRoutingModule {}
