import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule} from '@coreui/angular-pro';

import { BillDeskComponent } from './bill-desk.component';

// Routing
import { BillDeskRoutingModule } from './bill-desk-routing.module';
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
        BillDeskRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AgGridModule,
        ButtonDirective
    ],
  // entryComponents : [CellCustomComponent],
  declarations: [BillDeskComponent],
})
export class BillDeskModule { }
