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
    NavLinkDirective,
    SpinnerComponent,
    TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';
import {AgGridModule} from 'ag-grid-angular';
import {StudentSubjectComponent} from './student-subject.component';

// Routing
import {StudentSubjectRoutingModule} from './student-subject-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        StudentSubjectRoutingModule,
        CardModule,
        GridModule,
        FormModule,
        AutocompleteLibModule,
        AgGridModule,
        NavComponent,
        NavLinkDirective,
        SpinnerComponent,
        TabContentComponent, TabContentRefDirective, TabPaneComponent, ButtonDirective
    ],
  declarations: [StudentSubjectComponent],
})
export class StudentSubjectModule {
}
