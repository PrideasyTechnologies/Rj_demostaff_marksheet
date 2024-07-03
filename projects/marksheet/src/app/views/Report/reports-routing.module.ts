import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadFileComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadFileComponent,
    data: {
      title: 'DownloadFile Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadFileRoutingModule {}
