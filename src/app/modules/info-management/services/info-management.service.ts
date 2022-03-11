import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoManagementService {

  constructor(
    private httpClient: HttpClient,
  ) { }

 putProductDetail(data, params): any{
    return this.httpClient.put(`${environment.API_URL}/admin/content/detail`, data ,  {observe: 'response' , params});
  }

  getProductDetail(params): any{
    return this.httpClient.get(`${environment.API_URL}/content/detail`, {observe: 'response' , params});
  }

  putWebDetail(data, params): any{
    return this.httpClient.put(`${environment.API_URL}/admin/content/info`, data ,  {observe: 'response' , params});
  }

  getWebDetail(params): any{
    return this.httpClient.get(`${environment.API_URL}/admin/content/info`,  {observe: 'response' , params});
  }

  getTestimonyList(): any{
    return this.httpClient.get(`${environment.API_URL}/admin/content/testimony`,  {observe: 'response' });
  }

  getTestimonyById(id): any{
    return this.httpClient.get(`${environment.API_URL}/admin/content/testimony/${id}`,  {observe: 'response' });
  }

  uploadImageWeb(data): any{
    return this.httpClient.post(`${environment.API_URL}/admin/content/image`, data ,  {observe: 'response'});
  }



}
