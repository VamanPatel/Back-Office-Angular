import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LogoutModalComponent } from 'src/app/modules/admin-management/modal/logout-modal/logout-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activePanel = 'dashboard';

  constructor(
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private modalService: NgbModal
  ) {
    this.activeComponentByUrl();
   }

  ngOnInit() {
  }

  toggleSidePalnel(): void {
    const $wrapper = document.querySelector('#wrapper');
    $wrapper.classList.toggle('toggled');
  }

  logoutModal() {
    // localStorage.clear();
    // this.router.navigateByUrl('/admin/login');
    this.modalService.open(LogoutModalComponent);
    // this.ngxLoader.start();

  }

  activeComponentByUrl(): void {
    let pathArray = [];
    pathArray = window.location.pathname.split('/');
    // const selectedComponent = pathArray[1];
    // const selectedComponent = pathArray[3];
    // const selectedComponent = pathArray[3];
    let selectedComponent;
    if (window.location.host === 'localhost:4200'){
      selectedComponent = pathArray[1];
    }
    if (window.location.host === '144.76.184.38:1997'){
      selectedComponent = pathArray[3];
    }

    if ( selectedComponent === 'customer') {
      this.activePanel = 'customers';
    }
    if ( selectedComponent === 'admin-management') {
      this.activePanel = 'admin';
    }
    this.ngxLoader.stop();
  }



}
