import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {
    ButtonDirective,
    CardModule,
    CollapseDirective,
    FormModule,
    GridModule, NavComponent, NavItemComponent, NavLinkDirective,
    SpinnerComponent,
    TabsModule
} from '@coreui/angular-pro';

import { SubjectQuotaComponent } from './subject-quota.component';

// Routing
import { SubjectQuotaRoutingModule } from './subject-quota-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        SubjectQuotaRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        TabsModule,
        SpinnerComponent,
        ButtonDirective,
        CollapseDirective,
        NavComponent,
        NavItemComponent,
        NavLinkDirective
    ],
  declarations: [SubjectQuotaComponent],
})
export class SubjectQuotaModule { }
