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
    ModalModule,
    NavComponent,
    NavLinkDirective, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import {AgGridModule} from 'ag-grid-angular';


import {UploadSgpaComponent} from './upload-sgpa.component';

// Routing
import {UploadSgpaRoutingModule} from './upload-sgpa-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {DeleteCellCustomComponent} from "../delete-cellcustom/delete-cellcustom.component";
import {EditCellCustomComponent} from "../editcell-custom/editcell-custom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        UploadSgpaRoutingModule,
        CardModule,
        GridModule,
        ModalModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavComponent,
        NavLinkDirective,
        SpinnerComponent,
        TabContentRefDirective,
        TabPaneComponent,
        TabContentComponent,
        ButtonDirective,
    ],
    declarations: [UploadSgpaComponent],
})
export class UploadSgpaModule {
}
