import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomValidator } from 'src/app/shared/services/validation';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe = true;
  isError = false;
  loadButton = false;
  cookieEmail: string;
  cookiePassword: string;
  exdays = 10;

  form = this.fb.group({
    email: ['', [ Validators.required, CustomValidator.emailValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private fb: FormBuilder,
    private onboardingService: OnboardingService,
    public toastr: ToastrManager
  ) {
    if (document.cookie) {
      const cookiearray = document.cookie.split(';');
      // Now take key value pair out of this array
      cookiearray.forEach(x => {
        if (x.split('=')[0] === 'email') {
          this.cookieEmail = x.split('=')[1];
        }
        if (x.split('=')[0] === ' password') {
          this.cookiePassword = x.split('=')[1];
        }
      });
    }
   }

  ngOnInit(): void {
    if (this.cookieEmail && this.cookiePassword) {
      this.form.patchValue({
        email: this.cookieEmail,
        password: this.cookiePassword,
      });
    }
    this.ngxLoader.stop();
  }

  forgetPassword = () => {
    this.ngxLoader.start();
    this.router.navigate(['/admin/reset']);
  }

  login(): void {
    if (this.form.status === 'INVALID') {
      this.isError = true;
    }
    if (this.form.status === 'VALID') {
      this.loadButton = true;
      const loginData = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.onboardingService.login(loginData).subscribe((res: any) => {
        this.loadButton = false;
        if (res.status === 200){
          this.ngxLoader.start();
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', res.body.token);
          if (this.rememberMe) {
            const d = new Date();
            d.setTime(d.getTime() + (this.exdays * 24 * 60 * 60 * 1000));
            const expires = 'expires=' + d.toUTCString();
            document.cookie = `email = ${this.form.value.email}` + ';' + expires + ';path=/';
            document.cookie = `password = ${this.form.value.password}` + ';' + expires + ';path=/';
          }
          else {
            document.cookie = 'email' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'password' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
        }
        else {
          // this.toastr.successToastr('This is success toast.', 'Success!', {animate: 'slideFromRight'});
        // this.commonService.customErrorMessage('Unable to fetch bond holding');
        }
      },
      err => {
        this.toastr.errorToastr('Enter valid Email and Password', 'Error', {animate: 'slideFromRight'});
        this.loadButton = false;
        // this.commonService.customErrorMessage(err.error.error);
      } );

    }
  }

  get controls(): any{
    return this.form.controls;
  }

  changeRemember(event): any{
    this.rememberMe = event.target.checked;

  }

}
