import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// DataTable

import {ButtonDirective, CardModule, CollapseDirective, FormModule, GridModule} from '@coreui/angular-pro';
import { FeestructureattachmentComponent } from './feestructureattachment.component';
import {ModalModule} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'

// Routing
import { FeestructureattachmentRoutingModule } from './feestructureattachment-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    FeestructureattachmentRoutingModule,
    CardModule,
    GridModule,
    PdfViewerModule,
    FormModule,
    AutocompleteLibModule,
    AgGridModule,
    CollapseDirective,
    ButtonDirective
  ],
  declarations: [FeestructureattachmentComponent],
})
export class FeestructureattachmentModule { }
