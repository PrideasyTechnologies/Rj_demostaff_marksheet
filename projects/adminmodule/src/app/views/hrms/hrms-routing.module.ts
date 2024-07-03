import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HrmsComponent} from "./hrms.component";

const routes: Routes = [
    {
        path: '',
        component: HrmsComponent,
        data: {
            title: 'Question Paper'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HrmsRoutingModule {}
