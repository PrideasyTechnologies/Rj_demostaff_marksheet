import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule, SpinnerComponent} from '@coreui/angular-pro';

import { UpdateDetailsComponent } from './update-details.component';

// Routing
import { UpdateDetailsRoutingModule } from './update-details-routing.module';
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
        UpdateDetailsRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AgGridModule,
        SpinnerComponent,
        ButtonDirective
    ],
  // entryComponents : [CellCustomComponent],
  declarations: [UpdateDetailsComponent],
})
export class UpdateDetailsModule { }
