import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable
import {
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
  TabPaneComponent,
} from '@coreui/angular-pro';

import { SubjectQuotaComponent } from './assign-division.component';

// Routing
import { SubjectQuotaRoutingModule } from './assign-division-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SubjectQuotaRoutingModule,
    CardModule,
    ModalModule,
    PdfViewerModule,
    AutocompleteLibModule,
    GridModule,
    FormModule,
    AgGridModule,
    SpinnerComponent,
    ButtonDirective,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    SpinnerComponent,
    TabContentComponent,
    TabContentRefDirective,
    TabPaneComponent,
  ],
  declarations: [SubjectQuotaComponent],
})
export class SubjectQuotaModule {}
