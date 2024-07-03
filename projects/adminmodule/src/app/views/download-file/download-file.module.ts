import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ModalModule,
  SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent,
  ButtonDirective,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
} from '@coreui/angular-pro';

import { DownloadFileComponent } from './download-file.component';

// Routing
import { DownloadFileRoutingModule } from './download-file-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    DownloadFileRoutingModule,
    CardModule,
    ModalModule,
    PdfViewerModule,
    GridModule,
    FormModule,
    AutocompleteLibModule,
    AgGridModule,
    SpinnerComponent,
    NavModule,
    TabContentComponent,
    TabContentRefDirective,
    TabPaneComponent,
    ButtonDirective,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
  ],
  // entryComponents : [CellCustomComponent],
  declarations: [DownloadFileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DownloadFileModule {}
