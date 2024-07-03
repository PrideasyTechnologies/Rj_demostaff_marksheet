import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastYearOutstandingsComponent } from './lastyear-outstandings.component';

const routes: Routes = [
  {
    path: '',
    component: LastYearOutstandingsComponent,
    data: {
      title: 'LastYearOutstandings',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastYearOutstandingsRoutingModule {}
