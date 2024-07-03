import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallmentComponent } from './installment.component';

const routes: Routes = [
  {
    path: '',
    component: InstallmentComponent,
    data: {
      title: 'installment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallmentRoutingModule {}
