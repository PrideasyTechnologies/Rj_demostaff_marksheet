
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule, Validators,  } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
// import { SelectModule } from 'ng-select';
import {
  ButtonDirective, CalloutModule, CardBodyComponent, CardComponent, CardModule,
  CollapseDirective, ContainerComponent,
  DropdownModule,
  FormControlDirective,
  FormFeedbackComponent, FormModule, GridModule, ModalBodyComponent, ModalComponent,
  ModalFooterComponent, ModalHeaderComponent,
  NavComponent, NavItemComponent,
  NavLinkDirective, SpinnerComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular-pro";
import {DocumentRoutingModule} from "./document-routing.module";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {DocumentComponent} from "./document.component";
import { MultiSelectModule } from '@coreui/angular-pro';

@NgModule({
  imports: [
    DocumentRoutingModule,
    CommonModule,
    AgGridModule,
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    FormFeedbackComponent,
    FormControlDirective,
    NavComponent,
    NavLinkDirective,
    CollapseDirective,
    ContainerComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    TabContentComponent,
    TabPaneComponent,
    TabContentRefDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    AutocompleteLibModule,
    SpinnerComponent,
    CardModule,
    GridModule,
    FormModule,
    NavItemComponent,
    MultiSelectModule,
    DropdownModule,
    CalloutModule,
  ],
  declarations: [DocumentComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentModule { }
