import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule, SpinnerComponent} from '@coreui/angular-pro';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AdmissionCancelComponent } from './admission-cancel.component';

// Routing
import { AdmissionCancelRoutingModule } from './admission-cancel-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdmissionCancelRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        AutocompleteLibModule,
        FormModule,
        AgGridModule,
        SpinnerComponent,
        ButtonDirective
    ],
  declarations: [AdmissionCancelComponent],
})
export class AdmissionCancelModule { }
