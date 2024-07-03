import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    ModalBodyComponent,
    ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalToggleDirective,
    SpinnerComponent
} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MarksheetdownloadComponent } from './marksheetdownload.component';

// Routing
import { MarksheetdownloadRoutingModule } from './marksheetdownload-routing.module';
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MarksheetdownloadRoutingModule,
        CardModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        SpinnerComponent,
        PdfViewerModule,
        ModalComponent,
        ModalBodyComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        ModalToggleDirective,
        ButtonDirective
    ],
  declarations: [MarksheetdownloadComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarksheetdownloadModule { }
