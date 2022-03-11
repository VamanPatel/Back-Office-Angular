import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    NgbModule,
    CommonModule,
    DashboardAdminRoutingModule
  ]
})
export class DashboardAdminModule { }
