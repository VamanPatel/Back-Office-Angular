import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { AdminManagementService } from '../../services/adminmanagement.service';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-view-user-modal',
  templateUrl: './view-user-modal.component.html',
  styleUrls: ['./view-user-modal.component.css']
})
export class ViewUserModalComponent implements OnInit {
  closeResult: string;
  adminId: any;
  userDetail: any;


  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private route: Router,
    private stateManagementService: StateManagementService,
    private ngxLoader: NgxUiLoaderService,
    private adminManagementService: AdminManagementService,
  ) { }

  ngOnInit(): void {
    this.adminId = this.stateManagementService.editUserId;
    if (this.adminId){
      this.getAdmin();
    }
    else{
      this.activeModal.close('success');
      this.ngxLoader.stop();
    }
  }

  close(): void {
    this.activeModal.close('success');
  }
  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
    getDismissReason(reason: any): any {
      throw new Error('Method not implemented.');
    }

  getAdmin(): void {
    this.ngxLoader.start();
    this.adminManagementService.getAdminDetail(this.adminId).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200) {
        this.userDetail = res.body;
      }
      else {
        // this.commonService.customErrorMessage('Unable to fetch bond holding');
      }
    },
      err => {
        this.ngxLoader.stop();
        console.log('error in adding admin');
        // this.commonService.customErrorMessage(err.error.error);
      });
  }

  editAdmin(): void {
    this.activeModal.close('success');
    this.modalService.open(EditUserModalComponent);
  }


}
