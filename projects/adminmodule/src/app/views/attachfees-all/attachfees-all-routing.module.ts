import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachFeesAllComponent } from './attachfees-all.component';

const routes: Routes = [
  {
    path: '',
    component: AttachFeesAllComponent,
    data: {
      title: 'Fees Structure Attachment For All',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachFeesAllRoutingModule {}
