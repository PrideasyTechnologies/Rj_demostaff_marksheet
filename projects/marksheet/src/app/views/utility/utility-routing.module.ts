import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilityComponent } from './utility.component';

const routes: Routes = [
  {
    path: '',
    component: UtilityComponent,
    data: {
      title: 'Utility',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilityRoutingModule {}
