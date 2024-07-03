import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPictureComponent } from './upload-picture.component';

const routes: Routes = [
  {
    path: '',
    component: UploadPictureComponent,
    data: {
      title: 'UploadPicture Attachment',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPictureRoutingModule {}


