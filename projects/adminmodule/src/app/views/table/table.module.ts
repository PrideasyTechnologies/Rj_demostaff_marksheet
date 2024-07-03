// import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {EditProfileComponent} from './table.component';


// Routing
import {EditProfileRoutingModule} from './table-routing.module';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import {
    ButtonDirective,
    ButtonGroupModule,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent, ColComponent,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {AgGridModule} from "ag-grid-angular";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        EditProfileRoutingModule,
        PdfViewerModule,
        AutocompleteLibModule,
        AgGridModule,
        CardHeaderComponent,
        CardBodyComponent,
        CardComponent,
        SpinnerComponent,
        RowComponent,
        ColComponent,ButtonGroupModule,
        ButtonDirective, DropdownComponent,
        DropdownToggleDirective,
        ButtonDirective,
        DropdownMenuDirective,
        DropdownItemDirective,
    ],
    declarations: [EditProfileComponent]

})
export class EditProfileModule {
}

// platformBrowserDynamic().bootstrapModule(EditProfileModule);
