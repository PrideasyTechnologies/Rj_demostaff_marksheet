import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutsideStudentsComponent } from './outside-students.component';

const routes: Routes = [
  {
    path: '',
    component: OutsideStudentsComponent,
    data: {
      title: 'Outside Students',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutsideStudentsRoutingModule {}
