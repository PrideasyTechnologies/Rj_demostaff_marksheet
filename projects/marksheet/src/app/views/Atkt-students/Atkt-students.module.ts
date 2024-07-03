import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalToggleDirective,
    NavModule,
    SpinnerComponent,
    TabContentComponent,
    TabContentRefDirective, TableActiveDirective,
    TabPaneComponent
} from "@coreui/angular-pro";
import {AgGridModule} from 'ag-grid-angular';

import {AtktStudentsComponent} from './Atkt-students.component';

// Routing
import {AtktStudentsRoutingModule} from './Atkt-students-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {Delete_Selectedsubject} from "./delete_subjectinhouse";
import {Delete_subjectatktoutside} from "./delete_subjectatktoutside";
import {DeleteCellCustomComponent} from "../delete-cellcustom/delete-cellcustom.component";
import {IconComponent} from "@coreui/icons-angular";
import {NgxPrintElementModule} from "ngx-print-element";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AtktStudentsRoutingModule,
    CardModule,
    GridModule,
    FormModule,
    AutocompleteLibModule,
    AgGridModule,
    ButtonModule, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent,
    NavModule, ModalToggleDirective, ModalComponent, ModalHeaderComponent,
    SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent, TableActiveDirective, IconComponent, NgxPrintElementModule,
  ],
    declarations: [AtktStudentsComponent,Delete_Selectedsubject,Delete_subjectatktoutside,DeleteCellCustomComponent],
})
export class AtktStudentsModule {
}
