import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/services/validation';
import { OnboardingService } from '../../services/onboarding.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isError = false;
  loadButton = false;

  form = this.fb.group({
    email: ['', [Validators.required, CustomValidator.emailValidator]]
  });

  constructor(
    private stateManagementService: StateManagementService,
    private router: Router,
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private onBordingService: OnboardingService,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
  }

  resetPassword = (): void => {
    if (this.form.status === 'INVALID') {
      this.isError = true;
    }
    if (this.form.status === 'VALID') {
      this.loadButton = true;
      const obj = {
        content: 'Please check <b>YOUR INBOX</b> you would have received a link through which you can reset the password.',
        contentHeading: 'Reset password request sent',
        redirectTo: '/admin/login',
        button1: 'Done'
      };

      this.stateManagementService.messageObj = obj;

      const resetData = {
        email: this.form.value.email
      };
      this.onBordingService.forgot(resetData).subscribe((res: any) => {
        this.loadButton = false;
        if (res.status === 200) {
          this.ngxLoader.start();
          this.router.navigate(['/admin/message']);
        }
        else {
          // this.commonService.customErrorMessage('Unable to fetch bond holding');
        }
      },
        err => {
          this.toastr.errorToastr('Enter valid Email Id', 'Error', {animate: 'slideFromRight'});
          this.loadButton = false;
          // this.commonService.customErrorMessage(err.error.error);
        });

    }

  }

  get controls(): any {
    return this.form.controls;
  }

}
