import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: '',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: '',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: '',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: '',
    area: 9596960,
    population: 1409517397
  }
];
@Component({
  selector: 'app-activate-popup',
  templateUrl: './activate-popup.component.html',
  styleUrls: ['./activate-popup.component.css'],
  providers: [DatePipe]
})
export class ActivatePopupComponent implements OnInit {
 
  date:any;
  countries = COUNTRIES;
  constructor(public datepipe: DatePipe) { 
    
  }

  ngOnInit(): void {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }

}
