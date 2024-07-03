import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchTransferComponent } from './batch-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: BatchTransferComponent,
    data: {
      title: 'BatchTransfer Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchTransferRoutingModule {}
