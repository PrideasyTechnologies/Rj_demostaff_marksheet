import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DataTable

import {ButtonDirective, CardModule, FormModule, GridModule, NavComponent} from '@coreui/angular-pro';
import {

  NavItemComponent,
  NavLinkDirective, SpinnerComponent,
  TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';

import { UserCreationComponent } from './user-creation.component';


// Routing
import { UserCreationRoutingModule } from './user-creation-routing.module';
import {ModalModule} from '@coreui/angular-pro';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'
import {EditCellCustomComponent} from "../editcell-custom/editcell-custom.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserCreationRoutingModule,
        CardModule,
        ModalModule,
        PdfViewerModule,
        GridModule,
        FormModule,
        AgGridModule,
        ButtonDirective,
        NavComponent,
        NavItemComponent,
        NavLinkDirective,
        SpinnerComponent,
        TabContentComponent, TabContentRefDirective, TabPaneComponent
    ],
  // entryComponents : [CellCustomComponent],
  declarations: [UserCreationComponent],
})
export class UserCreationModule { }
