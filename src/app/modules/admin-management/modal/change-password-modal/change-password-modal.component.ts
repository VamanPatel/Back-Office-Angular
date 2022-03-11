import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { CustomValidator } from 'src/app/shared/services/validation';
import { AdminManagementService } from '../../services/adminmanagement.service';


@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  closeResult: string;
  isError = false;

  form = this.fb.group({
    password: ['', [Validators.required, CustomValidator.passwordStrength]],
    confirmPassword: ['' , [Validators.required, CustomValidator.passwordStrength, CustomValidator.passwordMatch]],
  });
  adminId: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private route: Router,
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    public toastr: ToastrManager,
    public adminManagementService: AdminManagementService,
    private stateManagementService: StateManagementService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
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
    getDismissReason(reason: any): any {
      throw new Error('Method not implemented.');
    }

    changePassword(): void {
      if (this.form.status === 'INVALID') {
        this.isError = true;
      }
      if (this.form.status === 'VALID') {

        const changePasswordData = {
          password: this.form.value.confirmPassword
        };
        this.adminManagementService.changePassword(this.adminId , changePasswordData).subscribe((res: any) => {
          if (res.status === 200) {
            this.toastr.successToastr('Password changed successfully', 'Success!', {animate: 'slideFromRight'});
            this.activeModal.close('success');
          }
          else {
            // this.commonService.customErrorMessage('Unable to fetch bond holding');
            this.activeModal.close('success');
          }
        },
          err => {
            this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
            this.ngxLoader.stop();
            // this.commonService.customErrorMessage(err.error.error);
          });

      }
    }

    get controls(): any{
      return this.form.controls;
    }


}
