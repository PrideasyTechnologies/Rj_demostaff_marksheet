import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent
} from '@coreui/angular-pro';

import {BillDeskComponent} from './upload-Billdesk.component';

// Routing
import {BillDeskRoutingModule} from './upload-Billdesk-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";

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
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    SpinnerComponent,
    NgIdleKeepaliveModule.forRoot(),
    TabContentComponent, TabContentRefDirective, TabPaneComponent, ButtonDirective, ButtonCloseDirective
  ],
    // entryComponents : [CellCustomComponent],
    declarations: [BillDeskComponent],
})
export class BillDeskModule {
}
