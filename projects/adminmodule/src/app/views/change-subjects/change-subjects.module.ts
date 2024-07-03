import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// DataTable

import {
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    ModalModule,
    NavModule,
    SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';

import {ChangeSubjectsComponent} from './change-subjects.component';

// Routing
import {ChangeSubjectsRoutingModule} from './change-subjects-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {ChangeSubjectsService} from './change-subjects.service';
import {HttpConfigInterceptor} from "../../globals/httpconfig.interceptor";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ChangeSubjectsRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavModule,
        SpinnerComponent,
        TabContentComponent, TabContentRefDirective, TabPaneComponent, ButtonDirective
    ],
  providers :[{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi:true
  },ChangeSubjectsService],
  declarations: [ChangeSubjectsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangeSubjectsModule {
}
