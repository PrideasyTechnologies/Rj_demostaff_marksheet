import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillDeskComponent } from './bill-desk.component';

const routes: Routes = [
  {
    path: '',
    component: BillDeskComponent,
    data: {
      title: 'BillDesk Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillDeskRoutingModule {}
