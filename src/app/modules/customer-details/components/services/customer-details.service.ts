import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  getCustomerListing(params): any{
    return this.httpClient.get(`${environment.API_URL}/admin/users`,  {observe: 'response' , params});
  }

  getCustomerTransactionHistory(id, params): any{
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/history`,  {observe: 'response' , params});
  }

  getCustomerHolding(id, params): any{
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/holding`,  {observe: 'response' , params});
  }

  getOverviewHolding(id): any{
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/holding/overview`,  {observe: 'response'});
  }

  // getCustomerBondHolding(id, params): any{
  //   return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/holding`,  {observe: 'response' , params});
  // }
  getCustomerInfo(params,id){    
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/general`,  {observe: 'response' , params});
  }

  changeStatus(custId, custStatus){    
    return this.httpClient.post(`${environment.API_URL}/admin/user/${custId}/${custStatus}`,  {observe: 'response' });
  }

  getCustomerAddress(params,id){    
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/address`,  {observe: 'response' , params});
  }
  getCustomerPayment(params,id){    
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/payment`,  {observe: 'response' , params});
  }

}
