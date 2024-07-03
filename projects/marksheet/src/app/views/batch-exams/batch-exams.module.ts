import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// DataTable
import {ButtonDirective, CardModule, FormModule, GridModule, ModalModule, SpinnerComponent} from '@coreui/angular-pro';
import {AgGridModule} from 'ag-grid-angular';


import {BatchExamsComponent} from './batch-exams.component';


// Routing
import {BatchExamsRoutingModule} from './batch-exams-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {EditCellCustomComponent} from "../editcell-custom/editcell-custom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        BatchExamsRoutingModule,
        CardModule,
        GridModule,
        FormModule,
        ModalModule,
        AutocompleteLibModule,
        AgGridModule,
        SpinnerComponent,
        ButtonDirective
    ],
  declarations: [BatchExamsComponent,EditCellCustomComponent],
})
export class BatchExamsModule {
}
