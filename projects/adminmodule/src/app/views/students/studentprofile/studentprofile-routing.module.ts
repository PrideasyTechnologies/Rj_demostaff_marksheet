import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentprofileComponent } from './studentprofile.component';

const routes: Routes = [
  {
    path: '',
    component: StudentprofileComponent,
    data: {
      title: 'Fill Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentprofileRoutingModule {}
