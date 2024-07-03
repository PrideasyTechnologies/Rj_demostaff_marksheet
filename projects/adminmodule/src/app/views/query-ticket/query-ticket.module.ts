import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, CollapseDirective, FormModule, GridModule} from '@coreui/angular-pro';

import { QueryTicketComponent } from './query-ticket.component';


// Routing
import { QueryTicketRoutingModule } from './query-ticket-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
    QueryTicketRoutingModule,
    CardModule,
    ModalModule,
    PdfViewerModule,
    GridModule,
    FormModule,
    AutocompleteLibModule,
    AgGridModule,
    ButtonDirective,
    CollapseDirective
  ],
  // entryComponents : [CellCustomComponent],
  declarations: [QueryTicketComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class QueryTicketModule { }
