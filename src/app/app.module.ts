import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AuthGuardService as AuthGuard } from './shared/auth-gaurd/auth-gaurd.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/front/header/header.component';
import { FooterComponent } from './layout/front/footer/footer.component';
import { FrontLayoutComponent } from './layout/front/front-layout/front-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminOnboardingComponent } from './layout/onboarding/admin-onboarding/admin-onboarding.component';
import { ActivatePopupComponent } from './modules/modals/activate/activate-popup.component';
import { DeactivatePopupComponent } from './modules/modals/deactivate/deactivate-popup.component';
import { SidePanelComponent } from './layout/front/side-panel/side-panel.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/services/jwt.interceptor';
import { ToastrModule } from 'ng6-toastr-notifications';
import { LogsDetailsComponent } from './modules/logs/components/logs-details/logs-details.component';
import { TransDetailsComponent } from './modules/transaction/components/trans-details/trans-details.component';
import { InfoManagementDetailsComponent } from './modules/info-management/components/info-management-details/info-management-details.component';
import { SettingDetailsComponent } from './modules/settings/components/setting-details/setting-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrontLayoutComponent,
    AdminOnboardingComponent,
    // CustomerListingComponent,
    ActivatePopupComponent,
    DeactivatePopupComponent,
    SidePanelComponent,
    LogsDetailsComponent,
    TransDetailsComponent,
    InfoManagementDetailsComponent,
    SettingDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxUiLoaderModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    NgbActiveModal,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
