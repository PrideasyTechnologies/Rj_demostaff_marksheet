import { NgModule, isDevMode } from '@angular/core';
import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  AccordionModule,
  AvatarComponent,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CalloutModule,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardTextDirective,
  CardTitleDirective,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CollapseDirective,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FooterModule,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormSelectDirective,
  GridModule,
  HeaderModule,
  InputGroupComponent,
  InputGroupTextDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  NavModule,
  SharedModule,
  SidebarModule,
  SpinnerComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent,
  TemplateIdDirective,
  TextColorDirective,
} from '@coreui/angular-pro';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LoginComponent } from './views/pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinyearComponent } from './views/pages/finyear/finyear.component';
import { HttpConfigInterceptor } from './globals/httpconfig.interceptor';
import { AuthService } from './globals/authservice';
import { EditCellCustomComponent } from './views/editcell-custom/editcell-custom.component';
import { DownloadCellCustomComponent } from './views/downloadcell-custom/downloadcell-custom.component';
import { CellCustomComponent } from './views/cell-custom/cell-custom.component';
import { PdfCellCustomComponent } from './views/pdfcell-custom/pdfcell-custom.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FeeReportComponent } from './views/fee-report/fee-report.component';
import { AdminReportComponent } from './views/admin-report/admin-report.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AgGridModule } from 'ag-grid-angular';
import { InwardoutwardComponent } from './views/inwardoutward/inwardoutward.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { FeedbackformComponent } from './views/feedbackform/feedbackform.component';
import { HrmsComponent } from './views/hrms/hrms.component';
import { AttachunattachfeesAllComponent } from './views/feesattachunattach/attachunattachfees-all.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { CanceladmissionComponent } from './views/students/canceladmission/canceladmission.component';
import { UpdateprofileComponent } from './views/students/updateprofile/updateprofile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgOtpInputModule } from 'ng-otp-input';
import { StudentprofileComponent } from './views/students/studentprofile/studentprofile.component';
import { RegisterComponent } from './views/students/register/register.component';
import { OtpComponent } from './views/students/otp/otp.component';
import { StudentsApprovalComponent } from './views/students-approval/students-approval.component';

const APP_CONTAINERS = [
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    P404Component,
    P500Component,
    FeedbackformComponent,
    FinyearComponent,
    HrmsComponent,
    CanceladmissionComponent,
    UpdateprofileComponent,
    EditCellCustomComponent,
    DownloadCellCustomComponent,
    RegisterComponent,
    CellCustomComponent,
    PdfCellCustomComponent,
    FeeReportComponent,
    StudentprofileComponent,
    OtpComponent,
    AdminReportComponent,
    InwardoutwardComponent,
    HrmsComponent,
    AttachunattachfeesAllComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BreadcrumbModule,
    FooterModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    SidebarModule,
    BadgeModule,
    NgScrollbarModule,
    HttpClientModule,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    InputGroupComponent,
    FormControlDirective,
    InputGroupTextDirective,
    AccordionModule,
    CalloutModule,
    SharedModule,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    AccordionButtonDirective,
    FormDirective,
    FormSelectDirective,
    DropdownComponent,
    AvatarComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownDividerDirective,
    TextColorDirective,
    AngularEditorModule,
    SpinnerComponent,
    CardHeaderComponent,
    AutocompleteLibModule,
    TabContentRefDirective,
    TabPaneComponent,
    TabContentComponent,
    AgGridModule,
    FormsModule,
    CardImgDirective,
    CardTitleDirective,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    FormCheckComponent,
    FormCheckLabelDirective,
    CollapseDirective,
    PdfViewerModule,
    FormCheckInputDirective,
    NgIdleKeepaliveModule.forRoot(),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    ModalBodyComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    ModalComponent,
    CardTextDirective,
    ImageCropperModule,
    NgOtpInputModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },

    IconSetService,
    AuthService,
    Title,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
