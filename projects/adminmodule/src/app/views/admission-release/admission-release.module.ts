import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// DataTable
import {CardModule, FormModule, GridModule, ModalModule} from '@coreui/angular-pro';
import {AdmissionReleaseComponent} from './admission-release.component';

// Routing
import {AdmissionReleaseRoutingModule} from './admission-release-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AdmissionReleaseService} from './admission-release.service';
import {HttpConfigInterceptor} from '../../globals/httpconfig.interceptor';
import {EditCellCustomComponent} from "../editcell-custom/editcell-custom.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdmissionReleaseRoutingModule,
    CardModule,
    ModalModule,
    PdfViewerModule,
    GridModule,
    FormModule,
    AutocompleteLibModule,
    AgGridModule
  ],
  providers: [AdmissionReleaseService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  declarations: [AdmissionReleaseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdmissionReleaseModule {


}
