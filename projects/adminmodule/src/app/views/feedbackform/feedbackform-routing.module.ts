import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FeedbackformComponent} from "./feedbackform.component";

const routes: Routes = [
    {
        path: '',
        component: FeedbackformComponent,
        data: {
            title: 'Question Paper'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeedbackformRoutingModule {}
