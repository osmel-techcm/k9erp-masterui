import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../config/globals';
import { Customer } from '../models/customer';
import { responseData } from '../models/responseData';
import { PaginatorData } from '../models/PaginatorData';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getCustomers() {
    return this.http.get<Customer[]>(this._global.apiUrl + "api/Customers");
  }

  getCustomerSearchList(paginatorData: PaginatorData) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Customers?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending);
  }

  getCustomer(id: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/Customers/" + id);
  }

  putCustomer(customer: Customer) {
    return this.http.put<responseData>(this._global.apiUrl + "api/Customers/" + customer.id, customer);
  }

  postCustomer(customer: Customer) {
    return this.http.post<responseData>(this._global.apiUrl + "api/Customers/", customer);
  }

}
