import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule, SpinnerComponent} from '@coreui/angular-pro';

import { OutsideStudentsComponent } from './outside-students.component';


// Routing
import { OutsideStudentsRoutingModule } from './outside-students-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        OutsideStudentsRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        SpinnerComponent,
        ButtonDirective
    ],
  // entryComponents : [CellCustomComponent],
  declarations: [OutsideStudentsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OutsideStudentsModule { }