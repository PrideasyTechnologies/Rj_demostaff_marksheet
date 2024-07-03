import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadSgpaComponent } from './upload-sgpa.component';

const routes: Routes = [
  {
    path: '',
    component: UploadSgpaComponent,
    data: {
      title: 'Uploadsgpa',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadSgpaRoutingModule {}
