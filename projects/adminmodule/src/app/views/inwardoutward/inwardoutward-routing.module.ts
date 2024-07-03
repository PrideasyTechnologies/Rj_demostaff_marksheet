import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InwardoutwardComponent} from "./inwardoutward.component";

const routes: Routes = [
    {
        path: '',
        component: InwardoutwardComponent,
        data: {
            title: 'Dashboard Report ',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InwardoutwardRoutingModule {}
