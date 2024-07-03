import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// DataTable

import {CardModule, FormModule, GridModule, SpinnerComponent} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'


import { EligibleListComponent } from './eligible-list.component';
import {ModalModule} from '@coreui/angular-pro';

// Routing
import { EligibleListRoutingModule } from './eligible-list-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {EligiblelistService} from './eligible-list.service';
import {HttpConfigInterceptor} from '../../globals/httpconfig.interceptor';


@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        EligibleListRoutingModule,
        CardModule,
        GridModule,
        ModalModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        SpinnerComponent
    ],
  providers: [EligiblelistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
    ],
  declarations: [EligibleListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EligibleListModule { }
