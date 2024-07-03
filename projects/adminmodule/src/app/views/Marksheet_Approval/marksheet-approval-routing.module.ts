import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksheetApprovalComponent } from './marksheet-approval.component';

const routes: Routes = [
  {
    path: '',
    component: MarksheetApprovalComponent,
    data: {
      title: 'Students Approval Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksheetApprovalRoutingModule {}
