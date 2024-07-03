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
    NavItemComponent,
    NavLinkDirective, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import {AgGridModule} from 'ag-grid-angular';


import {UploadTemplateComponent} from './upload-template.component';


// Routing
import {UploadTemplateRoutingModule} from './upload-template-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        UploadTemplateRoutingModule,
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
  declarations: [UploadTemplateComponent],
})
export class UploadTemplateModule {
}
