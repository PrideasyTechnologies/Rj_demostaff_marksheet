import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDetailsComponent } from './update-details.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateDetailsComponent,
    data: {
      title: 'Edit Profile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDetailsRoutingModule {}
