// import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {DashboardComponent} from './dashboard.component'


// Routing
// import {PdfViewerModule} from 'ng2-pdf-viewer';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    SpinnerComponent
} from "@coreui/angular-pro";
import {AgGridModule} from "ag-grid-angular";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        AutocompleteLibModule,
        AgGridModule,
        CardHeaderComponent,
        CardBodyComponent,
        CardComponent,
        SpinnerComponent,
        ButtonDirective
    ],
  declarations: [DashboardComponent]

})
export class DashboardModule {
}

// platformBrowserDynamic().bootstrapModule(EditProfileModule);
