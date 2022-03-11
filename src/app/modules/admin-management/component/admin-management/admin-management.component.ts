import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModalComponent } from '../../modal/add-user-modal/add-user-modal.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminManagementService } from '../../services/adminmanagement.service';
import { EditUserModalComponent } from '../../modal/edit-user-modal/edit-user-modal.component';
import { ViewUserModalComponent } from '../../modal/view-user-modal/view-user-modal.component';
import { DeleteUserModalComponent } from '../../modal/delete-user-modal/delete-user-modal.component';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
  closeResult: string;

  adminListing = [{name: '', email: '', lastLoginAt: '', activeSince: '', status: ''}];
  totalCount: any;
  page = 1;
  pageSize = 10;
  totalSize: number;
  showPagination = true;
  currentRouter: string;
  noData: boolean;
  loggedId: any;

  constructor(
    private modalService: NgbModal,
    private adminManagementService: AdminManagementService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,
    private stateManagementService: StateManagementService,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.currentRouter = this.router.url;
    this.getAdminDetail();
  }

  ngOnInit(): void {
    this.getAdminListing();
    // this.loggedId = this.stateManagementService.loggedId;
    // console.log(this.loggedId,'loggedd')
  }

  getAdminListing(page?, type?): void {
    const params: any = {
      size : this.pageSize
    };

    if (page){
      params.page = page;
    }
    if (type){
      params.sort = type;
    }
    this.ngxLoader.start();

    this.adminManagementService.getAdminList(params).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200){
        if (res.body.total > 0) {
          this.totalSize = res.body.total;
          this.adminListing = res.body.data;
          this.noData = false;
          this.showPagination = true;
        }
        else {
          this.totalSize = 0;
          this.showPagination = false;
          this.noData = true;
        }
      }
      else {
        this.totalSize = 0;
        this.showPagination = false;
        this.noData = true;
      }
    },
    err => {
      this.showPagination = false;
      this.totalSize = 0;
      this.noData = true;
      this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      this.ngxLoader.stop();
    } );
  }

  onchangePagination(event): any{
    this.getAdminListing(event);
  }

  addUser(): void {
    this.modalService.open(AddUserModalComponent);
  }

  editUser(id): void {
    this.stateManagementService.editUserId = id;
    this.modalService.open(EditUserModalComponent);
  }

  userInfo(id): void {
    this.ngxLoader.start();
    this.stateManagementService.editUserId = id;
    this.modalService.open(ViewUserModalComponent);
  }

  deleteUser(id): void {
    this.stateManagementService.editUserId = id;
    this.modalService.open(DeleteUserModalComponent);
  }

  reLoad(): void{
    // window.location.reload();
    this.getAdminListing();
  }

  sorting(type): void {
    if (type){
      this.getAdminListing('', type);
    }
  }

  getAdminDetail(): void {
    this.commonService.getAdminDetail().subscribe((res: any) => {
      if (res.status === 200) {
        this.loggedId = res.body.id;

      }
      else {
      }
    },
      err => {
        console.log(err.error.error)
      });

  }
}
