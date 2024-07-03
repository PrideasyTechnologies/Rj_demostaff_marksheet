import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchExamsComponent } from './batch-exams.component';

const routes: Routes = [
  {
    path: '',
    component: BatchExamsComponent,
    data: {
      title: 'Edit Profile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchExamsRoutingModule {}
