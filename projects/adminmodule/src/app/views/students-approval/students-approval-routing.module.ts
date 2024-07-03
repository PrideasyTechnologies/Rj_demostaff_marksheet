import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsApprovalComponent } from './students-approval.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsApprovalComponent,
    data: {
      title: 'Students Approval Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsApprovalRoutingModule {}
