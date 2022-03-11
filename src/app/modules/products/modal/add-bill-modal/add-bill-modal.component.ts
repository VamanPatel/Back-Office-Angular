import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-bill-modal',
  templateUrl: './add-bill-modal.component.html',
  styleUrls: ['./add-bill-modal.component.css']
})
export class AddBillModalComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit() {
  }

  close(): void {
    this.activeModal.close('success');
  }

    getDismissReason(reason: any): any {
      throw new Error('Method not implemented.');
    }

}
