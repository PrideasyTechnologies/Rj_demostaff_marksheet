import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OtpComponent } from './otp.component';
import { OtpRoutingModule } from './otp-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    // BrowserModule,
    // FormsModule,
    // CommonModule,
    ReactiveFormsModule,
    OtpRoutingModule,
  ],
  declarations: []
})
export class OtpModule { }
