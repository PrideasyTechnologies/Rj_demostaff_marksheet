import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeUnAttachmentComponent } from './fee-unattachment.component';

const routes: Routes = [
  {
    path: '',
    component: FeeUnAttachmentComponent,
    data: {
      title: 'Fee Un Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeUnAttachmentRoutingModule {}
