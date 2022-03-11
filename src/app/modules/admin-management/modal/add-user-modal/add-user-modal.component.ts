import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomValidator } from 'src/app/shared/services/validation';
import { AdminManagementService } from '../../services/adminmanagement.service';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  closeResult: string;
  isError = false;

  form = this.fb.group({
    name : ['', [ Validators.required]],
    email: ['', [ Validators.required, CustomValidator.emailValidator]],
    mobileNumber: ['', [ Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, CustomValidator.passwordStrength]],
  });


  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private adminManagementService: AdminManagementService,
    private ngxLoader: NgxUiLoaderService,
    public toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
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

    get controls(): any{
      return this.form.controls;
    }

    addAdmin(): void {
      if (this.form.status === 'INVALID') {
        this.isError = true;
      }
      if (this.form.status === 'VALID') {
        this.ngxLoader.start();
        const {name , email, mobileNumber, password} = this.form.value;
        const data = {
          name,
          email,
          mobile: mobileNumber,
          password
        };
        this.adminManagementService.addAdmin(data).subscribe((res: any) => {
          window.location.reload();
          // this.ngxLoader.stop();
          // this.activeModal.close('success');
          if (res.status === 200) {
            // window.location.reload();
          }
          else {
            // this.commonService.customErrorMessage('Unable to fetch bond holding');
          }
        },
          err => {
            this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
            this.ngxLoader.stop();
            console.log('error in adding admin');
            // this.commonService.customErrorMessage(err.error.error);
          });
      }
    }

}
