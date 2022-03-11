import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { DeactivatePopupComponent } from 'src/app/modules/modals/deactivate/deactivate-popup.component';
highcharts3D(Highcharts);
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailsService } from '../services/customer-details.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
   selector: 'app-cust-details',
   templateUrl: './cust-details.component.html',
   styleUrls: ['./cust-details.component.css']
})
export class CustDetailsComponent implements OnInit {
   public activity;
   public xData;
   public label;
   customer: any = [];
   previousUrl: any;
   options: any;
   overViewOptions: any;
   maxSize = 5;

   transactionSize = 10;
   transactionPage = 1;
   transactionTotal: number;
   transactionPagination = false;

   tbillSize = 10;
   tbillPage = 1;
   tbillTotal: number;
   tbillPagination = false;
   tbillsListing = [];
   noTbill: boolean;
   tbillTotalAmount: any;
   tbillTotalMaturity: any;

   bondSize = 10;
   bondPage = 1;
   bondTotal: number;
   bondPagination = false;
   bondsListing = [];
   nobond: boolean;
   bondTotalAmount: any;
   bondTotalMaturity: any;

   mutualFundSize = 10;
   mutualFundPage = 1;
   mutualFundTotal: number;
   mutualFundPagination = false;
   mutualFundsListing = [];
   nomutualFund: boolean;
   mutualFundTotalAmount: any;
   mutualFundTotalMaturity: any;

   shareSize = 10;
   sharePage = 1;
   shareTotal: number;
   sharePagination = false;
   sharesListing = [];
   noshare: boolean;
   shareTotalAmount: any;
   shareTotalMaturity: any;


   active = 1;
    customerId: any;
    noTransaction: boolean;
    transactionListing: any;
    noData: boolean;
    arrayData: any[];
    data: string;
    addressData: any = [];
    paymentData: any = [];
    totEarning: any;
    totInvestment: any;


   constructor(
       private ngxLoader: NgxUiLoaderService,
       private modalService: NgbModal,
       private route: ActivatedRoute,
       private router: Router,
       private customerDetailsService: CustomerDetailsService,
       public toastr: ToastrManager
    ) {
        this.route.params.subscribe(params => {
            this.customerId = params['id'];          
    });

    this.options = {
         chart: {
             type: 'pie',
             options3d: {
                 enabled: true,
                 alpha: 45,
                 beta: 0
             }
         },
         title: {
             text: ''
         },
         accessibility: {
             point: {
                 valueSuffix: '%'
             }
         },
         tooltip: {
             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         plotOptions: {
             pie: {
                 allowPointSelect: true,
                 size: 180,
                 cursor: 'pointer',
                 depth: 35,
                 colors: ['#d56565', '#007bff', '#4bdf2c', 'yellow'],
                 dataLabels: {
                     enabled: true,
                     format: '{point.name}'
                 }
             }
         },
         series: [{
             type: 'pie',
             name: 'Browser share',
             data: [
                 ['T-Bills', 45.0],
                 {
                     name: 'Bonds',
                     y: 12.8,
                     sliced: true,
                     selected: true
                 },
                 ['M.Funds', 8.5],
                 ['Shares', 6.2]
             ]
         }],
         credits: {
             enabled: false
         },
     };
    }

   ngOnInit(): void {
     //Highcharts.chart('chart-container', this.options);
    
      this.ngxLoader.stop();
      this.getCustomerInfo();
      this.getCustAddress();
      this.getCustPayment();
      this.getOverInvestmentView();
   }

   getCustomerInfo(): void {  
    const params: any = {
      //size : this.pageSize
    };
   
    //this.ngxLoader.start();
    this.customerDetailsService.getCustomerInfo(params, this.customerId).subscribe((res: any) => {
       
      
     
      if (res.status === 200){
       
        console.log(res);
           
        this.customer = res.body;    
           
      }
      else {
      // this.commonService.customErrorMessage('Unable to fetch bond holding');
      }
    },
    err => {     
      this.ngxLoader.stop();
      console.log('error in loading data');
      // this.commonService.customErrorMessage(err.error.error);
    } );
}
   deactivateAccount () {
      this.modalService.open(DeactivatePopupComponent);
   }

    getTransactionHistory(page?, sort?): void {
        this.ngxLoader.start();
        const params: any = {
            size: this.transactionSize
        };
        if (sort){
            params.sort = sort;
        }
        if (page){
            params.page = page;
          }
        this.customerDetailsService.getCustomerTransactionHistory(this.customerId, params).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                if (res.body && res.body.transactions && res.body.transactions.length > 0){
                    this.noTransaction = false;
                    this.transactionListing = res.body.transactions;
                    this.transactionTotal = res.body.total;
                }
                else {
                    this.noTransaction = true;
                }

            }
            else {
                this.noTransaction = true;
                // this.commonService.customErrorMessage('Unable to fetch bond holding');
            }
        },
            err => {
                this.ngxLoader.stop();
                this.noTransaction = true;
                console.log('error in login');
                // this.commonService.customErrorMessage(err.error.error);
            });
    }

    getTbillsHolding(page?): void {
        this.ngxLoader.start();
        const params: any = {
            size: this.tbillSize,
            type: 'TBILLS'
        };
        if (page) {
            params.page = page;
        }
        this.customerDetailsService.getCustomerHolding(this.customerId, params).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                if (res.body && res.body.data && res.body.data.length > 0) {
                    this.noTbill = false;
                    this.tbillsListing = res.body.data;
                    this.tbillTotal = res.body.total;
                    this.tbillTotalAmount = res.body.totalCost;
                    this.tbillTotalMaturity = res.body.totalMaturity;
                    this.tbillPagination = true;
                }
                else {
                    this.noTbill = true;
                    this.tbillPagination = false;
                }

            }
            else {
                this.noTbill = true;
                this.tbillPagination = false;
                // this.commonService.customErrorMessage('Unable to fetch bond holding');
            }
        },
            err => {
                this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
                this.ngxLoader.stop();
                this.tbillPagination = false;
                this.noTbill = true;
                // this.noTransaction = true;
                // console.log('error in login');
                // this.commonService.customErrorMessage(err.error.error);
            });
    }

    getBondHolding(page?): void {
        this.ngxLoader.start();
        const params: any = {
            size: this.bondSize,
            type: 'BOND'
        };
        if (page) {
            params.page = page;
        }
        this.customerDetailsService.getCustomerHolding(this.customerId, params).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                if (res.body && res.body.data && res.body.data.length > 0) {
                    this.nobond = false;
                    this.bondsListing = res.body.data;
                    this.bondTotal = res.body.total;
                    this.bondTotalAmount = res.body.totalCost;
                    this.bondTotalMaturity = res.body.totalMaturity;
                    this.bondPagination = true;
                }
                else {
                    this.nobond = true;
                    this.bondPagination = false;
                }

            }
            else {
                this.nobond = true;
                this.bondPagination = false;
            }
        },
            err => {
                this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
                this.nobond = true;
                this.bondPagination = false;
                this.ngxLoader.stop();
                // this.commonService.customErrorMessage(err.error.error);
            });
    }

    getMutualFundHolding(page?): void {
        this.ngxLoader.start();
        const params: any = {
            size: this.mutualFundSize,
            type: 'MUTUAL_FUND'
        };
        if (page) {
            params.page = page;
        }
        this.customerDetailsService.getCustomerHolding(this.customerId, params).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                if (res.body && res.body.data && res.body.data.length > 0) {
                    this.nomutualFund = false;
                    this.mutualFundsListing = res.body.data;
                    this.mutualFundTotal = res.body.total;
                    this.mutualFundTotalAmount = res.body.totalCost;
                    this.mutualFundTotalMaturity = res.body.totalMaturity;
                    this.mutualFundPagination = true;
                }
                else {
                    this.mutualFundPagination = false;
                    this.nomutualFund = true;
                }

            }
            else {
                this.mutualFundPagination = false;
                this.nomutualFund = true;
                // this.commonService.customErrorMessage('Unable to fetch bond holding');
            }
        },
            err => {
                this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
                this.mutualFundPagination = false;
                this.nomutualFund = true;
                this.ngxLoader.stop();
                // this.commonService.customErrorMessage(err.error.error);
            });
    }

    getShareHolding(page?): void {
        this.ngxLoader.start();
        const params: any = {
            size: this.shareSize,
            type: 'SHARE'
        };
        if (page) {
            params.page = page;
        }
        this.customerDetailsService.getCustomerHolding(this.customerId, params).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                if (res.body && res.body.data && res.body.data.length > 0) {
                    this.noshare = false;
                    this.sharesListing = res.body.data;
                    this.shareTotal = res.body.total;
                    this.shareTotalAmount = res.body.totalCost;
                    this.shareTotalMaturity = res.body.totalMaturity;
                    this.sharePagination = true;
                }
                else {
                    this.noshare = true;
                    this.sharePagination = false;
                }

            }
            else {
                this.noshare = true;
                this.sharePagination = false;
                // this.commonService.customErrorMessage('Unable to fetch bond holding');
            }
        },
            err => {
                this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
                this.noshare = true;
                this.sharePagination = false;
                this.ngxLoader.stop();
                // this.commonService.customErrorMessage(err.error.error);
            });
    }


    onchangePagination(event, type): void{
        if (type === 'bond'){
            this.getBondHolding(event);
        }
        if (type === 'tbill'){
            this.getTbillsHolding(event);
        }
        if (type === 'mutualFund'){
            this.getMutualFundHolding(event);
        }
        if (type === 'transaction'){
            this.getTransactionHistory(event);
        }
        // this.getTransactionHistory(event);
      }

      getOverView(): any {
        this.ngxLoader.start();
        this.customerDetailsService.getOverviewHolding(this.customerId).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                if (res.body.totalInvestment > 0) {
                    this.noData = false;
                    this.arrayData = [];
                    res.body.distribution.forEach(x => {
                        const obj: any = {
                            name: x.name,
                            y: +x.percentage,
                            amount: x.value

                        };
                        if (x.type === 'BOND') {
                            obj.sliced = true;
                            obj.selected = true;
                        }

                        this.arrayData.push(obj);

                    });
                    this.data = '';

                    if (res.body.distribution.length === this.arrayData.length) {

                        this.overViewOptions = {
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 45,
                                    beta: 0
                                }
                            },
                            title: {
                                text: ''
                            },
                            accessibility: {
                                point: {
                                    valueSuffix: '%'
                                }
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>GHS {point.amount:.0f}</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    size: 180,
                                    cursor: 'pointer',
                                    depth: 35,
                                    colors: ['#d56565', '#007bff', '#4bdf2c', 'yellow'],
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    }
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: 'Holding share',
                                data: this.arrayData
                            }],
                            credits: {
                                enabled: false
                            },
                        };

                        Highcharts.chart('chart-overview', this.options);

                    }

                }
                else {
                    this.ngxLoader.stop();
                    this.noData = true;
                }

            }
            else {
                this.ngxLoader.stop();
                this.noData = true;
                // console.log('Unable to fetch overview');
            }
        },
            err => {
                this.ngxLoader.stop();
                this.noData = true;
                // console.log('Unable to fetch overview');
            });
      }

      changeCustomerStatus(custStatus): void {       
        this.ngxLoader.start();
        this.customerDetailsService.changeStatus(this.customerId, custStatus).subscribe((res: any) => {     
          document.getElementById('close1').click();
          document.getElementById('close2').click();
          console.log(res);
          this.getCustomerInfo();
          this.ngxLoader.stop();
        },
        err => {     
          this.ngxLoader.stop();
          console.log('error in loading data');
          // this.commonService.customErrorMessage(err.error.error);
        } );
      }

      

    getCustAddress(): void {  
        const params: any = {
          //size : this.pageSize
        };       
        //this.ngxLoader.start();
        this.customerDetailsService.getCustomerAddress(params, this.customerId).subscribe((res: any) => { 
            console.log(res);
            this.addressData = res.body;    
        },
        err => {     
          this.ngxLoader.stop();
          console.log('error in loading data');
          // this.commonService.customErrorMessage(err.error.error);
        } );
    }
    getCustPayment(): void {  
        const params: any = {
          //size : this.pageSize
        };       
        //this.ngxLoader.start();
        this.customerDetailsService.getCustomerPayment(params, this.customerId).subscribe((res: any) => { 
            console.log(res);
            this.paymentData = res.body;    
        },
        err => {     
          this.ngxLoader.stop();
          console.log('error in loading data');
          // this.commonService.customErrorMessage(err.error.error);
        } );
    }
    getOverInvestmentView(): any {
        this.ngxLoader.start();
        this.customerDetailsService.getOverviewHolding(this.customerId).subscribe((res: any) => {
            this.ngxLoader.stop();
            if (res.status === 200) {
                console.log(res);
                if (res.body.totalInvestment > 0) {
                    this.noData = false;
                    this.arrayData = [];
                    this.totEarning = res.body.totalInvestment;
                    this.totInvestment = res.body.totalInvestment;
                    res.body.distribution.forEach(x => {
                        const obj: any = {
                            name: x.name,
                            y: +x.percentage,
                            amount: x.value

                        };
                        if (x.type === 'BOND') {
                            obj.sliced = true;
                            obj.selected = true;
                        }

                        this.arrayData.push(obj);

                    });
                    this.data = '';

                    if (res.body.distribution.length === this.arrayData.length) {

                        this.overViewOptions = {
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 45,
                                   
                                }
                            },
                            legend: {
                                symbolHeight: 20,
                                symbolWidth: 20,
                                symbolRadius: 0,
                                itemStyle: {
                                    fontSize:'20px',                                  
                                    color: '#A0A0A0'
                                 },
                                 itemHoverStyle: {
                                    color: '#A8ACB9'
                                 },
                                 
                                 labelFormatter: function() {
                                    return '<span style="color: '+this.color+'">'+ this.name + '</span>';
                                 
                                }
                              },
                            title: {
                                text: ''
                            },
                            accessibility: {
                                point: {
                                    valueSuffix: '%'
                                }
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>GHS {point.amount:.0f}</b>'
                            },
                            plotOptions: {
                                pie: {
                                    innerSize: 100,
                                    depth: 35,
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            },
                            series: [{
                               
                                name: 'Holding share',
                                data: this.arrayData
                            }],
                            credits: {
                                enabled: false
                            },
                        };

                        Highcharts.chart('chart-investment-overview', this.overViewOptions);

                    }

                }
                else {
                    this.ngxLoader.stop();
                    this.noData = true;
                }

            }
            else {
                this.ngxLoader.stop();
                this.noData = true;
                // console.log('Unable to fetch overview');
            }
        },
            err => {
                this.ngxLoader.stop();
                this.noData = true;
                // console.log('Unable to fetch overview');
            });
      }

      sortTransaction(type): void{
        this.getTransactionHistory(0, type);
      }
}
