import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseMarksComponent } from './course-marks.component';

const routes: Routes = [
  {
    path: '',
    component: CourseMarksComponent,
    data: {
      title: 'CourseMarks',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseMarksRoutingModule {}
