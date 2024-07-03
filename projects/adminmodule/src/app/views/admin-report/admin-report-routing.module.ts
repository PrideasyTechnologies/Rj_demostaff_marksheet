import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminReportComponent } from './admin-report.component';

const routes: Routes = [
    {
        path: '',
        component: AdminReportComponent,
        data: {
            title: 'FeeReport Attachment',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminReportRoutingModule {}
