import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from 'src/app/shared/services/common.service';
import { StateManagementService } from 'src/app/shared/services/state-management.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
})
export class SidePanelComponent implements OnInit {
  activePanel: any;
  adminName: any;
  lastLogin: any;
  isSupperAdmin = false;
  loggedId: any;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private commonService: CommonService,
    public stateManagementService: StateManagementService
  ) {
    this.ngxLoader.start();
    this.getAdminDetail();
    this.activeComponentByUrl();
  }

  ngOnInit(): void {}

  activeComponent(value): void {
    if (value === 'customers') {
      this.activePanel = value;
    }
  }

  activeComponentByUrl(): void {
    let pathArray = [];
    pathArray = window.location.pathname.split('/');
    let selectedComponent;
    if (window.location.host === 'localhost:4200') {
      selectedComponent = pathArray[1];
    }
    if (window.location.host === '144.76.184.38:1997') {
      selectedComponent = pathArray[3];
    }

    if (selectedComponent === 'dashboard') {
      this.activePanel = 'dashboard';
    }

    if (selectedComponent === 'customer') {
      this.activePanel = 'customers';
    }
    if (selectedComponent === 'admin-management') {
      this.activePanel = 'admin';
    }
    if (selectedComponent === 'product') {
      this.activePanel = 'products';
    }
    if (selectedComponent === 'logs') {
      this.activePanel = 'log';
    }
    if (selectedComponent === 'transactions') {
      this.activePanel = 'transaction';
    }
    if (selectedComponent === 'transfer-management') {
      this.activePanel = 'transfermanagement';
    }
    if (selectedComponent === 'info-management') {
      this.activePanel = 'info';
    }
    if (selectedComponent === 'settings') {
      this.activePanel = 'setting';
    }

    this.ngxLoader.stop();
  }

  getAdminDetail(): void {
    this.commonService.getAdminDetail().subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.loggedId = res.body.id;
          this.stateManagementService.loggedId = res.body.id;
          this.adminName = res.body.name;
          this.lastLogin = res.body.lastLoginAt;
          if (
            res.body &&
            res.body.role &&
            res.body.role.type === 'SUPER_ADMIN'
          ) {
            this.isSupperAdmin = true;
          }
        } else {
          // this.toastr.successToastr('This is success toast.', 'Success!', {animate: 'slideFromRight'});
          // this.commonService.customErrorMessage('Unable to fetch bond holding');
        }
      },
      (err) => {
        // this.commonService.customErrorMessage(err.error.error);
      }
    );
  }
}
