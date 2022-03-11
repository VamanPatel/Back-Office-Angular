import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  messageObj = {};

  editUserId: any;

  customerId: any;

  loggedId: any;

  constructor() { }
}
