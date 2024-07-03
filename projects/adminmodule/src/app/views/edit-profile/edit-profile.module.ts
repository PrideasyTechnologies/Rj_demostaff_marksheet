import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// DataTable

import {
  ButtonDirective,
  CardModule, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective,
  FormModule,
  GridModule,
  ModalModule,
  NavComponent,
  NavLinkDirective,
  SpinnerComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from '@coreui/angular-pro';

import {EditProfileComponent} from './edit-profile.component';

// Routing
import {EditProfileRoutingModule} from './edit-profile-routing.module';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    EditProfileRoutingModule,
    CardModule,
    ModalModule,
    PdfViewerModule,
    GridModule,
    FormModule,
    AgGridModule,
    SpinnerComponent,
    NavComponent,
    NavLinkDirective,
    TabContentComponent,
    TabContentRefDirective,
    TabPaneComponent,
    DropdownComponent,
    DropdownToggleDirective,
    ButtonDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
  ],
  // entryComponents : [CellCustomComponent],
  declarations: [EditProfileComponent],
})
export class EditProfileModule {
}
