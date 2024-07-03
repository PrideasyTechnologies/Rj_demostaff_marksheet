import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeReportComponent } from './fee-report.component';

const routes: Routes = [
    {
        path: '',
        component: FeeReportComponent,
        data: {
            title: 'FeeReport Attachment',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeeReportRoutingModule {}
