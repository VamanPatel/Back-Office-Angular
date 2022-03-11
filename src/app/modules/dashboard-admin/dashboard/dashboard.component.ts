import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
exporting(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  date: any;
 
  public options: any = {
    title: false,
    subtitle: false,
    chart: {
        type: 'area'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    plotOptions: {
        series: {
            fillOpacity: 0.1
        }
    },

    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }],
      exporting: {
        buttons: {
            contextButton: {
                enabled: false
            },
            exportButton: {
                text: 'Download',              
                align: 'right',              
                verticalAlign: 'bottom',               
                // Use only the download related menu items from the default
                // context button
                menuItems: [
                    'downloadPNG',
                    'downloadJPEG',
                    'downloadPDF',
                    'downloadSVG'
                ]
            },
            printButton: {
                text: 'Print',
                align: 'right',              
                verticalAlign: 'bottom',
                onclick: function () {
                    this.print();
                }
            }
        }
    }
  }
  constructor(
    public datepipe: DatePipe,
    private ngxLoader: NgxUiLoaderService,
    ){
  }

  ngOnInit(): void {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.ngxLoader.stop();

    Highcharts.chart('graph-container', this.options);
    
  }


}
