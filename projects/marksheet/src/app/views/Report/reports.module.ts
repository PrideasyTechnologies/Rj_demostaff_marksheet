import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {
    ButtonDirective,
    CardModule, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective,
    FormModule,
    GridModule, LoadingButtonComponent,
    NavComponent,
    NavItemComponent,
    NavLinkDirective, SpinnerComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';

import { DownloadFileComponent } from './reports.component';

// Routing
import { DownloadFileRoutingModule } from './reports-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
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
        NavComponent,
        NavItemComponent,
        NavLinkDirective,
        TabContentComponent,
        TabPaneComponent,
        TabContentRefDirective,
        SpinnerComponent,
        DropdownComponent,
        DropdownToggleDirective,
        ButtonDirective,
        DropdownMenuDirective,
        DropdownItemDirective,
        LoadingButtonComponent
    ],
  // entryComponents : [CellCustomComponent],
  declarations: [DownloadFileComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DownloadFileModule { }
