import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentSubjectComponent } from './student-subject.component';

const routes: Routes = [
  {
    path: '',
    component: StudentSubjectComponent,
    data: {
      title: 'StudentSubject',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSubjectRoutingModule {}
