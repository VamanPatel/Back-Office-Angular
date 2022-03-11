import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontLayoutComponent } from './layout/front/front-layout/front-layout.component';
import { AdminOnboardingComponent } from './layout/onboarding/admin-onboarding/admin-onboarding.component';
import { ActivatePopupComponent } from './modules/modals/activate/activate-popup.component';
import { DeactivatePopupComponent } from './modules/modals/deactivate/deactivate-popup.component';
import { AuthGuardService as AuthGuard } from './shared/auth-gaurd/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminOnboardingComponent,
    loadChildren: () =>
      import('./modules/admin-onboarding/admin-onboarding.module').then(
        (m) => m.AdminOnboardingModule
      ),
  },
  {
    path: 'customer',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/customer-details/customer-details.module').then(
        (m) => m.CustomerDetailsModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/dashboard-admin/dashboard-admin.module').then(
        (m) => m.DashboardAdminModule
      ),
  },
  {
    path: 'admin-management',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/admin-management/admin-management.module').then(
        (m) => m.AdminManagementModule
      ),
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/products/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
  },
  {
    path: 'transfer-management',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/transfer-management/transfer-management.module').then(
        (m) => m.TransFerModule
      ),
  },
  {
    path: 'logs',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/logs/logs.module').then((m) => m.LogsModule),
  },
  {
    path: 'info-management',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/info-management/info-management.module').then(
        (m) => m.InfoManagementModule
      ),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: FrontLayoutComponent,
    loadChildren: () =>
      import('./modules/settings/setting.module').then((m) => m.SettingModule),
  },
  {
    path: 'activate-popup',
    component: ActivatePopupComponent,
  },
  {
    path: 'deactivate-popup',
    component: DeactivatePopupComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'admin',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
