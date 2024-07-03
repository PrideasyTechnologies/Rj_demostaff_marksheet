import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// DataTable

import {
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    NavComponent,
    NavItemComponent,
    NavLinkDirective, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'


import { LeavingCertificateComponent } from './leaving-certificate.component';
import { ModalModule } from '@coreui/angular-pro';

// Routing
import { LeavingCertificateRoutingModule } from './leaving-certificate-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {LeavingCertificateService} from './leaving-certificate.service';
import {HttpConfigInterceptor} from "../../globals/httpconfig.interceptor";
import {DeleteCellCustomComponent} from "../delete-cellcustom/delete-cellcustom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        LeavingCertificateRoutingModule,
        CardModule,
        GridModule,
        ModalModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavComponent,
        NavItemComponent,
        NavLinkDirective,
        SpinnerComponent,
        TabContentComponent, TabContentRefDirective, TabPaneComponent, ButtonDirective
    ],
  providers:[LeavingCertificateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  declarations: [LeavingCertificateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeavingCertificateModule { }
