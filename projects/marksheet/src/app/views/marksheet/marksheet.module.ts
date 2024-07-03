import {NgModule} from '@angular/core';
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
    NavItemComponent, NavLinkDirective, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MarksheetComponent} from './marksheet.component';

// Routing
import {MarksheetRoutingModule} from './marksheet-routing.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MarksheetRoutingModule,
        CardModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavComponent,
        NavItemComponent,
        NavLinkDirective,
        SpinnerComponent,
        TabContentComponent, TabContentRefDirective, TabPaneComponent, ButtonDirective
    ],
    declarations: [MarksheetComponent],
})
export class MarksheetModule {
}
