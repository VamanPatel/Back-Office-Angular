import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminManagementService {

  constructor(
    private httpClient: HttpClient
  ) { }


    getAdminList(params): any {
      return this.httpClient.get(`${environment.API_URL}/admin/users/admin`, {observe: 'response' , params});
    }

    addAdmin(data): any {
        return this.httpClient.post(`${environment.API_URL}/admin/users/admin`, data, { observe: 'response' });
      }
      getAdminDetail(id): any {
        return this.httpClient.get(`${environment.API_URL}/admin/users/${id}`, {observe: 'response'});
      }

      editAdmin(id, data): any {
        return this.httpClient.put(`${environment.API_URL}/admin/users/${id}`, data, { observe: 'response' });
      }

      deleteAdmin(id): any {
        return this.httpClient.delete(`${environment.API_URL}/admin/users/${id}`);
      }
        changePassword(id, data): any {
        return this.httpClient.put(`${environment.API_URL}/admin/users/${id}/password`, data, { observe: 'response' });
      }
    // forgot(data): any {
    //   return this.httpClient.post(`${environment.API_URL}/admin/auth/forgot`, data, { observe: 'response' });
    // }

    // reset(data): any {
    //   return this.httpClient.post(`${environment.API_URL}/admin/auth/reset`, data, { observe: 'response' });
    // }

}
