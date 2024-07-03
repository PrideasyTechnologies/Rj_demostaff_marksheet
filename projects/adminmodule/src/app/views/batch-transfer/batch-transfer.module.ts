import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable

import {
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    NavComponent,
    NavItemComponent, NavLinkDirective, SpinnerComponent,
    TabsModule
} from '@coreui/angular-pro';

import {BatchTransferComponent} from './batch-transfer.component';

// Routing
import {BatchTransferRoutingModule} from './batch-transfer-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        BatchTransferRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AgGridModule,
        AutocompleteLibModule,
        TabsModule,
        NavComponent,
        NavItemComponent,
        NavLinkDirective,
        SpinnerComponent,
        ButtonDirective
    ],
  declarations: [BatchTransferComponent],
})
export class BatchTransferModule {
}
