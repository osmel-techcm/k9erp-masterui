import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../config/globals';
import { responseData } from '../models/responseData';
import { Tenant } from '../models/tenant';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getTenants(customer: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Tenants/getGenantsByCustomer?customer=" + customer);
  }

  postTenants(tenant: Tenant) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Tenants", tenant);
  }

  putTenants(tenant: Tenant) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Tenants/" + tenant.id, tenant);
  }

}
