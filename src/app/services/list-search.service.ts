import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { PaginatorData } from '../models/PaginatorData';
import { AspnetusersService } from './aspnetusers.service';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class ListSearchService {

  constructor(private http: HttpClient, private _global: Globals, public _customer: CustomersService, public aspnetusersService: AspnetusersService) { }

  getData(type: number, paginatorData: PaginatorData){
    switch (type) {
      case 1:
        return this._customer.getCustomerSearchList(paginatorData)
      case 2:
        return this.aspnetusersService.getUsers(paginatorData)
    }
  }
}
