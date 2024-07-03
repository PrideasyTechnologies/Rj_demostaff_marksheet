import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachunattachfeesAllComponent } from './attachunattachfees-all.component';

const routes: Routes = [
  {
    path: '',
    component: AttachunattachfeesAllComponent,
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
