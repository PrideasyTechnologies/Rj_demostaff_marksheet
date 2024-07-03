import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule, NavModule, SpinnerComponent, TabsModule} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'


import { EligibleListComponent } from './eligible-list.component';
import {ModalModule} from '@coreui/angular-pro';

// Routing
import { EligibleListRoutingModule } from './eligible-list-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


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
        SpinnerComponent,
        ButtonDirective,
        NavModule, 
        TabsModule
    ],
  declarations: [EligibleListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EligibleListModule { }
