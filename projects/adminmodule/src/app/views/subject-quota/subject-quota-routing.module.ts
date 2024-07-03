import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectQuotaComponent } from './subject-quota.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectQuotaComponent,
    data: {
      title: 'Subject Quota',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectQuotaRoutingModule {}
