import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule,
    NavComponent,
    NavItemComponent,
    NavLinkDirective, SpinnerComponent,
    TabsModule
} from '@coreui/angular-pro';


import {InstallmentComponent} from './installment.component';

// Routing
import {InstallmentRoutingModule} from './installment-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AgGridModule} from "ag-grid-angular";


@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        InstallmentRoutingModule,
        CardModule,
        GridModule,
        TabsModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavComponent,
        NavLinkDirective,
        NavItemComponent,
        SpinnerComponent,
        ButtonDirective,

    ],
    declarations: [InstallmentComponent],
})
export class InstallmentModule {
}
