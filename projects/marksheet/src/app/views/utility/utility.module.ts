import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityRoutingModule } from './utility-routing.module';
import { UtilityComponent } from './utility.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    ButtonDirective,
    CardModule, ColComponent,
    FormModule,
    NavComponent,
    NavItemComponent,
    NavLinkDirective, RowComponent, SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular-pro";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  declarations: [UtilityComponent],
    imports: [
        FormsModule,
        CardModule,
        ReactiveFormsModule,
        CommonModule,
        UtilityRoutingModule,
        AutocompleteLibModule,
        FormModule,
        AgGridModule,
        NavComponent,
        NavItemComponent,
        NavLinkDirective,
        TabContentComponent,
        TabPaneComponent,
        TabContentRefDirective,
        SpinnerComponent,
        ColComponent,
        RowComponent,
        ButtonDirective,
    ]
})
export class UtilityModule {}
