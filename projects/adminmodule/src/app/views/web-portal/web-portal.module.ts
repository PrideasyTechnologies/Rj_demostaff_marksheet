import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule, ModalModule} from '@coreui/angular-pro';

import {WebPortalComponent} from './web-portal.component';


// Routing
import {WebPortalRoutingModule} from './web-portal-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {EditCellCustomComponent} from "../editcell-custom/editcell-custom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        WebPortalRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        ButtonDirective
    ],
  // entryComponents : [CellCustomComponent],
  declarations: [WebPortalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebPortalModule {
}
