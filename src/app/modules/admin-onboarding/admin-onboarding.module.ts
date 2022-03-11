import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminOnboardingRoutingModule } from './admin-onboarding-routing.module';
import { LoginComponent } from './component/login/login.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { CustomOnboardingAlertComponent } from './component/custom-onboarding-alert/custom-onboarding-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, NewPasswordComponent, CustomOnboardingAlertComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    AdminOnboardingRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AdminOnboardingModule { }
