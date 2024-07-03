import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeesCollectionComponent } from './fees-collection.component';

const routes: Routes = [
  {
    path: '',
    component: FeesCollectionComponent,
    data: {
      title: 'Fees Collection',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesCollectionRoutingModule {}
