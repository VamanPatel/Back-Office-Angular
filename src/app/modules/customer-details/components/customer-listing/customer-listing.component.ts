import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { CustomerDetailsService } from '../services/customer-details.service';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customers',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css'],
  providers: [DatePipe]
})
export class CustomerListingComponent implements OnInit {

  custId: any = undefined;
  customers: any = undefined;
  totalCount: any;
  page = 1;
  pageSize = 30;
  totalSize: number;
  showPagination = true;
  date: any;

  //filters
  status: any = "";
  startDate : any = "";
  endDate: any = "";
  kyc: any = "";
  sort: any = "DESC";

  splitStartDate : any = "";
  splitEndDate: any = "";

  //datepicker
  model: NgbDateStruct;

  isLoading = false;
  
  constructor(
    public datepipe: DatePipe,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private customerService:  CustomerDetailsService) {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.customerListing();
  }

  viewCustomer(id): void{
    this.ngxLoader.start();
    this.router.navigate(['/customer/customer-details', id] );
  }

  customerListing(page?): void {
      this.isLoading = !this.isLoading;
     
      if( this.startDate != "" ) {        
        this.splitStartDate = this.startDate.day + '-' + this.startDate.month + '-' + this.startDate.year ;        
      }
      if( this.endDate != "" ) {
        this.splitEndDate = this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year ; 
      }
  
      const params: any = {
        status: this.status,
        kyc : this.kyc,
        sort : this.sort,
        size : this.pageSize
      };

      if (page){
        params.page = page;
      }
      if (this.splitStartDate){
        params.startDate = this.splitStartDate;
      }
      if (this.splitEndDate){
        params.endDate = this.splitEndDate;
      }
      //this.ngxLoader.start();
      
      this.customerService.getCustomerListing(params).subscribe((res: any) => {
        //this.ngxLoader.stop();
        this.isLoading = !this.isLoading;
       
        console.log(res);
        if (res.status === 200){
          //this.ngxLoader.start();
          this.totalSize = res.body.total;
          this.customers = res.body.data;
         
        }
        else {
        // this.commonService.customErrorMessage('Unable to fetch bond holding');
        }
      },
      err => {
        this.isLoading = !this.isLoading;
        //this.ngxLoader.stop();
        console.log('error in loading data');
        // this.commonService.customErrorMessage(err.error.error);
      } );
  }
  onchangePagination(event): any{
    this.customerListing(event);
  }

  
  refresh(){
    this.status = "";
    this.kyc = "";
    this.sort = "";
    this.startDate= "";
    this.endDate= "";
    this.customerListing();
  }

  setId(custId){
    this.custId = custId ;
  }

  changeCustomerStatus(custStatus): void {       
   
    this.customerService.changeStatus(this.custId, custStatus).subscribe((res: any) => {     
      document.getElementById('close1').click();
      document.getElementById('close2').click();
      console.log(res);
      this.customerListing();
      
    },
    err => {     
     
      console.log('error in loading data');
      // this.commonService.customErrorMessage(err.error.error);
    } );
  }
}
