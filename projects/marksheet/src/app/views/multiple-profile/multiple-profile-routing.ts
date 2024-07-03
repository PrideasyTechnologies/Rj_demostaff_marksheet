import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleProfileComponent } from './multiple-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MultipleProfileComponent,
    data: {
      title: 'MultipleProfile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleProfileRoutingModule {}
