import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksheetdownloadComponent } from './marksheetdownload.component';

const routes: Routes = [
  {
    path: '',
    component: MarksheetdownloadComponent,
    data: {
      title: 'CourseMarks',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksheetdownloadRoutingModule {}
