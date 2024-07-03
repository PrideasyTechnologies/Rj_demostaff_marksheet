import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksheetComponent } from './marksheet.component';

const routes: Routes = [
  {
    path: '',
    component: MarksheetComponent,
    data: {
      title: 'marksheet',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksheetRoutingModule {}
