import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {
  CardModule,
  FormModule,
  GridModule, NavItemComponent, NavLinkDirective,
  SpinnerComponent,
  TabContentComponent, TabContentRefDirective,
  TabPaneComponent
} from '@coreui/angular-pro';
import { AttachunattachfeesAllComponent } from './attachunattachfees-all.component';
import {ModalModule} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'

// Routing
import { AttachFeesAllRoutingModule } from './attachfees-all-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    AttachFeesAllRoutingModule,
    CardModule,
    GridModule,
    FormModule,
    AutocompleteLibModule,
    AgGridModule,
    SpinnerComponent,
    TabContentComponent,
    TabPaneComponent,
    NavItemComponent,
    NavLinkDirective,
    TabContentRefDirective
  ],
  declarations: [],
})
export class AttachunattachFeesAllModule { }
