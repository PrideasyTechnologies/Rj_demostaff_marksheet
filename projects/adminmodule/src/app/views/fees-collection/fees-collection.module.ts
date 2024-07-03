import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable
import {
    ButtonDirective,
    CardModule,
    FormModule,
    GridModule, HeaderComponent,
    ModalModule,
    NavComponent,
    NavItemComponent, NavLinkDirective, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TableDirective, TabPaneComponent
} from '@coreui/angular-pro';
import {FeesCollectionComponent} from './fees-collection.component';


// Routing
import {FeesCollectionRoutingModule} from './fees-collection-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        FeesCollectionRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavItemComponent,
        NavComponent,
        HeaderComponent,
        NavLinkDirective,
        SpinnerComponent,
        TabContentComponent, TabContentRefDirective, TabPaneComponent, TableDirective, ButtonDirective

    ],
  declarations: [FeesCollectionComponent],
})
export class FeesCollectionModule {
}
