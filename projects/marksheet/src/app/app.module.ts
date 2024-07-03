import { NgModule, isDevMode } from '@angular/core';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';
import { CellCustomComponent } from './views/cell-custom/cell-custom.component';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
} from './containers';

import {
    AlertComponent,
    AvatarComponent,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardBodyComponent,
    CardComponent,
    CardGroupComponent, CardHeaderComponent, DropdownComponent, DropdownDividerDirective,
    DropdownHeaderDirective, DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    FooterModule,
    FormControlDirective,
    FormDirective, FormFeedbackComponent,
    FormSelectDirective,
    GridModule,
    HeaderModule,
    InputGroupComponent,
    InputGroupTextDirective,
    NavModule,
    SidebarModule, SpinnerComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent,
    TextColorDirective
} from '@coreui/angular-pro';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {LoginComponent} from "./views/pages/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinyearComponent} from "./views/pages/finyear/finyear.component";
import {HttpConfigInterceptor} from "./globals/httpconfig.interceptor";
import {AuthService} from "./globals/authservice";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {EditCellCustomComponent} from "./views/editcell-custom/editcell-custom.component";
import {DeleteCellCustomComponent} from "./views/delete-cellcustom/delete-cellcustom.component";
import { QuestionpaperuploadComponent } from './views/questionpaperupload/questionpaperupload.component';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import { ServiceWorkerModule } from '@angular/service-worker';
import {PromptUpdateService} from "./globals/prompt-update.service";
import {CheckForUpdateService} from "./globals/check-for-update.service";
import {LogUpdateService} from "./globals/log-update.service";

const APP_CONTAINERS = [
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS,
                 LoginComponent,  
                 FinyearComponent,
                  CellCustomComponent,
    QuestionpaperuploadComponent
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
        FormDirective,
        FormSelectDirective,
        DropdownToggleDirective,
        AvatarComponent,
        TextColorDirective,
        DropdownMenuDirective,
        DropdownHeaderDirective,
        DropdownItemDirective,
        DropdownDividerDirective,
        DropdownComponent,
        CardHeaderComponent,
        AutocompleteLibModule,
        SpinnerComponent,
        FormFeedbackComponent,
        FormsModule,
        TabContentComponent,
        TabPaneComponent,
        TabContentRefDirective,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        AlertComponent,
    ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    IconSetService, AuthService,
    Title, DatePipe,
    PromptUpdateService,
    CheckForUpdateService,
    LogUpdateService
  ],
})
export class AppModule {
}
