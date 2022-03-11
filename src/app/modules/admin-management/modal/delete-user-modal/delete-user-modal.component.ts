import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { AdminManagementService } from '../../services/adminmanagement.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  closeResult: string;
  adminId: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private route: Router,
    private stateManagementService: StateManagementService,
    private adminManagementService: AdminManagementService,
    private ngxLoader: NgxUiLoaderService,
    public toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
    this.adminId = this.stateManagementService.editUserId;
    if (!this.adminId){
      this.activeModal.close('success');
    }
  }

  close(): void {
    this.activeModal.close('success');
  }
  // open(content): void {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
    getDismissReason(reason: any) {
      throw new Error('Method not implemented.');
    }

  deleteAdmin(): void{
    this.ngxLoader.start();

    this.adminManagementService.deleteAdmin(this.adminId).subscribe((res: any) => {
      window.location.reload();
      this.ngxLoader.start();
      if (res.status === 200) {
      }
      else {
        // this.commonService.customErrorMessage('Unable to fetch bond holding');
      }
    },
      err => {
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
        this.ngxLoader.stop();
        // this.commonService.customErrorMessage(err.error.error);
      });

  }

}
