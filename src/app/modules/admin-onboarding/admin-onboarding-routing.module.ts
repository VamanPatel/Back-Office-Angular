import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomOnboardingAlertComponent } from './component/custom-onboarding-alert/custom-onboarding-alert.component';
import { LoginComponent } from './component/login/login.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'message',
    component: CustomOnboardingAlertComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOnboardingRoutingModule { }
