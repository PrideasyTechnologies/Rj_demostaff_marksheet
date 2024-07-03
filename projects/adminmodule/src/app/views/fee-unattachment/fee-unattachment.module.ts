import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule} from '@coreui/angular-pro';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { FeeUnAttachmentComponent } from './fee-unattachment.component';

// Routing
import { FeeUnAttachmentRoutingModule } from './fee-unattachment-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';


import { CellCustomComponent } from '../cell-custom/cell-custom.component'

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        FeeUnAttachmentRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        AutocompleteLibModule,
        FormModule,
        AgGridModule,
        ButtonDirective
    ],
  declarations: [FeeUnAttachmentComponent],
})
export class FeeUnAttachmentModule { }
