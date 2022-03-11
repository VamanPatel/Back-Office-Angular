import { Component, OnInit } from '@angular/core';
// import { version } from '../../../../../package.json';
const project = require('../../../../../package.json');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  version: any;

  constructor() { }

  ngOnInit(): void {
    this.version = project.version;
  }

}
