import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadTemplateComponent } from './upload-template.component';

const routes: Routes = [
  {
    path: '',
    component: UploadTemplateComponent,
    data: {
      title: 'UploadTemplate',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadTemplateRoutingModule {}
