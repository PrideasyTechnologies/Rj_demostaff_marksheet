import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EligibleListComponent } from './eligible-list.component';


const routes: Routes = [
  {
    path: '',
    component: EligibleListComponent,
    data: {
      title: 'Eligiblelist',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EligibleListRoutingModule {}
