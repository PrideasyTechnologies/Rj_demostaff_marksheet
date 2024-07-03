import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StudentprofileRoutingModule} from './studentprofile-routing.module';
import {AccordionButtonDirective, AccordionComponent, AccordionItemComponent, AccordionModule, CalloutModule, SharedModule, TemplateIdDirective} from "@coreui/angular-pro";

// import { SelectModule } from 'ng-select';


@NgModule({
  imports: [
    StudentprofileRoutingModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    CalloutModule,
    SharedModule,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    AccordionButtonDirective
  ],
  // exports: [FillprofileComponent],
  declarations: []
})
export class StudentprofileModule { }
