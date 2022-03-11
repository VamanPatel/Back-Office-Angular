import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {
  closeResult: string;


  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,

  ) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close('success');
  }

  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.ngxLoader.start();
    this.activeModal.close('success');
    localStorage.clear();
    this.router.navigateByUrl('/admin/login');
  }

}
