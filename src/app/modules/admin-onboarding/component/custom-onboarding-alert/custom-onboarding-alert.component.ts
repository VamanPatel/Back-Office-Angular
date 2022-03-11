import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateManagementService } from 'src/app/shared/services/state-management.service';

@Component({
  selector: 'app-custom-onboarding-alert',
  templateUrl: './custom-onboarding-alert.component.html',
  styleUrls: ['./custom-onboarding-alert.component.css']
})
export class CustomOnboardingAlertComponent implements OnInit, AfterContentChecked {
  messageObj: any = {};
  constructor(
    private stateManagementService: StateManagementService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
    this.messageObj = this.stateManagementService.messageObj;
    if ( ! this.messageObj.contentHeading){
      this.router.navigate(['/admin/login']);
    }

  }

  ngAfterContentChecked(): void{
    document.getElementById('customContent').innerHTML = this.messageObj.content;
  }

  onConfirm = () => {
    this.ngxLoader.start();
    this.router.navigate([this.messageObj.redirectTo]);
  }

}
