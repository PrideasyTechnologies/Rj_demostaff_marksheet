// import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable
import {
    ButtonCloseDirective,
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    SpinnerComponent
} from '@coreui/angular-pro';

import { MarksheetApprovalComponent } from './marksheet-approval.component';

// Routing
import { MarksheetApprovalRoutingModule } from './marksheet-approval-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {CellCustomComponent} from "../cell-custom/cell-custom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        // BrowserModule,
        FormsModule,
        HttpClientModule,
        MarksheetApprovalRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        SpinnerComponent,
        ButtonDirective,
        ButtonCloseDirective
    ],
  declarations: [MarksheetApprovalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MarksheetApprovalModule { }
// platformBrowserDynamic().bootstrapModule(MarksheetApprovalModule);
