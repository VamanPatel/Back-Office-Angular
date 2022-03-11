import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  getCustomerInfo(params,id){    
    return this.httpClient.get(`${environment.API_URL}/admin/users/${id}/general`,  {observe: 'response' , params});
  }

    // login(data): any {
    //     return this.httpClient.post(`${environment.API_URL}/admin/auth/signin`, data, { observe: 'response' });
    // }

    // forgot(data): any {
    //   return this.httpClient.post(`${environment.API_URL}/admin/auth/forgot`, data, { observe: 'response' });
    // }

    // reset(data): any {
    //   return this.httpClient.post(`${environment.API_URL}/admin/auth/reset`, data, { observe: 'response' });
    // }

}
