import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { AdminManagementComponent } from './component/admin-management/admin-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModalComponent } from './modal/add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from './modal/edit-user-modal/edit-user-modal.component';
import { ViewUserModalComponent } from './modal/view-user-modal/view-user-modal.component';
import { DeleteUserModalComponent } from './modal/delete-user-modal/delete-user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordModalComponent } from './modal/change-password-modal/change-password-modal.component';
import { LogoutModalComponent } from './modal/logout-modal/logout-modal.component';


@NgModule({
  declarations: [AdminManagementComponent, AddUserModalComponent, EditUserModalComponent, ViewUserModalComponent, DeleteUserModalComponent, ChangePasswordModalComponent, LogoutModalComponent],
  imports: [
    CommonModule,
    AdminManagementRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddUserModalComponent,
    EditUserModalComponent,
    ViewUserModalComponent,
    DeleteUserModalComponent,
    ChangePasswordModalComponent,
    LogoutModalComponent
  ]
})
export class AdminManagementModule { }
