import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';
import { CustomValidator } from 'src/app/shared/services/validation';
import { OnboardingService } from '../../services/onboarding.service';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  isError = false;
  loadButton = false;
  token: any;

  form = this.fb.group({
    password: ['', [Validators.required, CustomValidator.passwordStrength]],
    confirmPassword: ['' , [Validators.required, CustomValidator.passwordStrength, CustomValidator.passwordMatch]],
  });

  constructor(
    private stateManagementService: StateManagementService,
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private onBordingService: OnboardingService,
    private route: ActivatedRoute,
    public toastr: ToastrManager
  ) {
    this.ngxLoader.start();
    this.token = this.route.snapshot.queryParams.token;
    if (this.token === undefined) {
      localStorage.clear();
      this.router.navigateByUrl('/admin/login');
    }
   }


  ngOnInit(): void {
    this.ngxLoader.stop();
  }


  get controls(): any{
    return this.form.controls;
  }

  changePassword(): void {
    if (this.form.status === 'INVALID') {
      this.isError = true;
    }
    if (this.form.status === 'VALID') {
      this.ngxLoader.start();
      const obj = {
        content: 'Your password has been reset. Now you can login with the new password.',
        contentHeading: 'Success!',
        redirectTo: '/admin/login',
        button1: 'Done'
      };

      this.stateManagementService.messageObj = obj;

      const changePasswordData = {
        token: this.token,
        password: this.form.value.confirmPassword
      };
      this.onBordingService.reset(changePasswordData).subscribe((res: any) => {
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
          this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
          this.loadButton = false;
          this.ngxLoader.stop();
          // this.commonService.customErrorMessage(err.error.error);
        });

    }
  }

}
