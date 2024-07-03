
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
// import { SelectModule } from 'ng-select';
import {
  ButtonDirective, CardBodyComponent, CardComponent, CardModule,
  CollapseDirective, ContainerComponent,
  FormControlDirective,
  FormFeedbackComponent, FormModule, GridModule, ModalBodyComponent, ModalComponent,
  ModalFooterComponent, ModalHeaderComponent,
  NavComponent,
  NavLinkDirective, SpinnerComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular-pro";
import {QuestionpaperRoutingModule} from "./questionpaper-routing.module";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {CourseMarksRoutingModule} from "../course-marks/course-marks-routing.module";

@NgModule({
  imports: [
    QuestionpaperRoutingModule,
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
    CourseMarksRoutingModule,
    CardModule,
    GridModule,
    FormModule,
  ],
  declarations: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionpaperModule { }
