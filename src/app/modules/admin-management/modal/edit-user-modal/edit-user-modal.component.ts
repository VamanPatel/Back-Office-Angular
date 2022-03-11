import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { CustomValidator } from 'src/app/shared/services/validation';
import { AdminManagementService } from '../../services/adminmanagement.service';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  closeResult: string;
  isError = false;

  form = this.fb.group({
    name : ['', [ Validators.required]],
    email: ['', [ Validators.required, CustomValidator.emailValidator]],
    mobileNumber: ['', [ Validators.required, Validators.minLength(10)]],
  });
  adminId: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private adminManagementService: AdminManagementService,
    private ngxLoader: NgxUiLoaderService,
    private stateManagementService: StateManagementService,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.adminId = this.stateManagementService.editUserId;
    if (this.adminId){
      this.getAdmin();
    }
    else{
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

    editAdmin(): void {
      if (this.form.status === 'INVALID') {
        this.isError = true;
      }
      if (this.form.status === 'VALID') {
        this.ngxLoader.start();
        const {name , email, mobileNumber, password} = this.form.value;
        const data = {
          name,
          email,
          mobile: mobileNumber
        };
        this.adminManagementService.editAdmin(this.adminId, data).subscribe((res: any) => {
          window.location.reload();
          // this.ngxLoader.stop();
          // this.activeModal.close('success');
          if (res.status === 200) {
            // this.router.navigateByUrl('/admin-management', {skipLocationChange: true});
          }
          else {
            // this.commonService.customErrorMessage('Unable to fetch bond holding');
          }
        },
          err => {
            this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
            this.ngxLoader.stop();
            // console.log('error in adding admin');
            // this.commonService.customErrorMessage(err.error.error);
          });
      }
    }

  getAdmin(): void {
    this.ngxLoader.start();
    this.adminManagementService.getAdminDetail(this.adminId).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200) {
        this.form.patchValue({
        name: res.body.name,
        email: res.body.email,
        mobileNumber: res.body.mobile,
        password: ''
      });
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

  get controls(): any{
    return this.form.controls;
  }
  changePwd(): void {
    this.activeModal.close('success');
    this.ngxLoader.start();
    this.modalService.open(ChangePasswordModalComponent);
  }

}
