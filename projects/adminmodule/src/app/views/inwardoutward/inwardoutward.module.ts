import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// import { NgxGalleryModule } from '@kolkov/ngx-gallery';
// DataTable

import {
    CardModule, CarouselModule,
    FormModule,
    GridModule,
    NavComponent,
    NavItemComponent,
    NavLinkDirective, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import { AgGridModule } from 'ag-grid-angular';
import { CellCustomComponent } from '../cell-custom/cell-custom.component'


import { InwardoutwardComponent } from './inwardoutward.component';
import { ModalModule } from '@coreui/angular-pro';

// Routing
import { InwardoutwardRoutingModule } from './inwardoutward-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {InwardoutwardService} from './inwardoutward.service';
import {HttpConfigInterceptor} from "../../globals/httpconfig.interceptor";
import {DeleteCellCustomComponent} from "../delete-cellcustom/delete-cellcustom.component";
import {IconModule, IconSetService} from "@coreui/icons-angular";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        InwardoutwardRoutingModule,
        CardModule,
        GridModule,
        ModalModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,CarouselModule,
        NavComponent,
        NavItemComponent,
        NavLinkDirective,IconModule,
        SpinnerComponent,
        TabContentComponent,TabContentRefDirective,TabPaneComponent
    ],
    providers:[InwardoutwardService,IconSetService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true
        }
    ],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InwardoutwardModule { }
