import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbcdFormComponent } from './abcd.component';

const routes: Routes = [
  {
    path: '',
    component: AbcdFormComponent,
    data: {
      title: '',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbcdFormRoutingModule {}
