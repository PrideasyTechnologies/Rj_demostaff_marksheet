import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangeSubjectsComponent} from './change-subjects.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeSubjectsComponent,
    data: {
      title: 'Change Subjects Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeSubjectsRoutingModule {
}
