import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getTestimonials(params): any{
    return this.httpClient.get(`${environment.API_URL}/admin/content/testimony`, {observe: 'response' , params});
  }
 
  uploadImage(data): any{
    return this.httpClient.post(`${environment.API_URL}/admin/content/image`, data ,  {observe: 'response'});
  }
  addTestimonial(data): any{
    return this.httpClient.post(`${environment.API_URL}/admin/content/testimony`, data, {observe: 'response' });
  }
  deleteTestimonial(id): any{
    return this.httpClient.delete(`${environment.API_URL}/admin/content/testimony/${id}`, {observe: 'response' });
  }
  updateTestimony(id, data): any{
    return this.httpClient.put(`${environment.API_URL}/admin/content/testimony/${id}`, data, {observe: 'response' });
  }
  getTestimonialDetail(params, id): any{
    return this.httpClient.get(`${environment.API_URL}/admin/content/testimony/${id}`, {observe: 'response' , params});
  }
}
