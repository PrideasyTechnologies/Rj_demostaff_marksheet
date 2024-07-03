import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {ButtonDirective, CardModule, FormModule, GridModule, SpinnerComponent} from '@coreui/angular-pro';
import {AgGridModule} from 'ag-grid-angular';


import {MultipleProfileComponent} from './multiple-profile.component';


// Routing
import {MultipleProfileRoutingModule} from './multiple-profile-routing';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MultipleProfileRoutingModule,
        CardModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        SpinnerComponent,
        ButtonDirective
    ],
  declarations: [MultipleProfileComponent],
})
export class MultipleProfileModule {
}
