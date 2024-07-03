// import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {
    ButtonCloseDirective,
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    NavComponent, NavItemComponent,
    NavLinkDirective,
    SpinnerComponent,
    TabContentComponent,
    TabContentRefDirective,
    TabPaneComponent
} from '@coreui/angular-pro';

import {StudentsApprovalComponent} from './students-approval.component';

// Routing
import {StudentsApprovalRoutingModule} from './students-approval-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {DownloadCellCustomComponent} from "../downloadcell-custom/downloadcell-custom.component";
import {CellCustomComponent} from "../cell-custom/cell-custom.component";
import {PdfCellCustomComponent} from "../pdfcell-custom/pdfcell-custom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        // BrowserModule,
        FormsModule,
        HttpClientModule,
        StudentsApprovalRoutingModule,
        CardModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule, ModalModule, ButtonCloseDirective, ButtonDirective, TabPaneComponent, NavComponent, NavLinkDirective, TabContentRefDirective, TabContentComponent, SpinnerComponent, NavItemComponent
    ],
  declarations: [StudentsApprovalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentsApprovalModule {
}

// platformBrowserDynamic().bootstrapModule(StudentsApprovalModule);
