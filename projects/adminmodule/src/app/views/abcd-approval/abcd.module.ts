// import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {AbcdFormComponent} from './abcd.component';


// Routing
import {AbcdFormRoutingModule} from './abcd-routing.module';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective, ColComponent,
    ContainerComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent, ModalToggleDirective, RowComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {AgGridModule} from "ag-grid-angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgxImageZoomModule} from "ngx-image-zoom";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        AbcdFormRoutingModule,
        PdfViewerModule,
        AutocompleteLibModule,
        AgGridModule,
        CardHeaderComponent,
        CardBodyComponent,
        CardComponent,
        SpinnerComponent,
        CardTextDirective,
        CardTitleDirective,
        NgxImageZoomModule,
        ContainerComponent,
        ModalHeaderComponent,
        ModalComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalToggleDirective,
        ColComponent,
        RowComponent,
        ButtonDirective,
    ],
    declarations: [AbcdFormComponent]

})
export class EditProfileModule {
}

// platformBrowserDynamic().bootstrapModule(EditProfileModule);
