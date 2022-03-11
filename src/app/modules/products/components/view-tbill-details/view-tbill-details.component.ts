import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBillModalComponent } from '../../modal/add-bill-modal/add-bill-modal.component';

@Component({
  selector: 'app-view-tbill-details',
  templateUrl: './view-tbill-details.component.html',
  styleUrls: ['./view-tbill-details.component.css']
})
export class ViewTbillDetailsComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
  }

  addBillModal() {
    this.modalService.open(AddBillModalComponent);

  }

}
