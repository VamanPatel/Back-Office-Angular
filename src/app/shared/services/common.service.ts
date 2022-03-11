import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private httpClient: HttpClient
  ) { }


    getAdminDetail(): any {
      return this.httpClient.get(`${environment.API_URL}/admin/details`, {observe: 'response'});
    }


}
