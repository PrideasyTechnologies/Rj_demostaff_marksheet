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
  AvatarComponent,
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent, ColComponent,
  DropdownModule,
  ImgDirective,
  RowComponent,
  SharedModule,
  SpinnerComponent,
  WidgetModule
} from "@coreui/angular-pro";
import {AgGridModule} from "ag-grid-angular";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { IconModule } from '@coreui/icons-angular';
import {  DashboardRoutingModule } from './dashboard-routing.module';

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
    RowComponent,
    IconModule,
    ColComponent,
    ButtonModule,
    DropdownModule,
    SharedModule,
    WidgetModule,
    AvatarComponent,
    ImgDirective,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]

})
export class DashboardModule {
}

// platformBrowserDynamic().bootstrapModule(EditProfileModule);
