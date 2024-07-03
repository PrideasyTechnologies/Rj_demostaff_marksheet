import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmissionReleaseComponent } from './admission-release.component';

const routes: Routes = [
  {
    path: '',
    component: AdmissionReleaseComponent,
    data: {
      title: 'Admission Release',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ],
  exports: [RouterModule],
})
export class AdmissionReleaseRoutingModule {

}
