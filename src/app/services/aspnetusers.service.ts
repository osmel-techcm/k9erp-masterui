import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { AspNetUsers } from '../models/aspNetUsers';
import { PaginatorData } from '../models/PaginatorData';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class AspnetusersService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getAspNetUsersGroupByCustomer(customer: number) {
    return this.http.get<responseData>(this._global.apiUrl + "api/AspNetUsers/GetUsersByCustomer?customer=" + customer);
  }

  putUsers(aspNetUsers: AspNetUsers) {
    return this.http.put<responseData>(this._global.apiUrl + "api/AspNetUsers/" + aspNetUsers.id, aspNetUsers);
  }

  postUsers(aspNetUsers: AspNetUsers) {
    return this.http.post<responseData>(this._global.apiUrl + "api/AspNetUsers", aspNetUsers);
  }

  getUsers(paginatorData: PaginatorData){
    return this.http.get<any>(this._global.apiUrl + "api/AspNetUsers/GetUsers?PageNumber=" + paginatorData.PageNumber + "&PageSize=" + paginatorData.PageSize + "&filterDataSt=" + paginatorData.filterDataSt + "&orderField=" + paginatorData.orderField + "&descending=" + paginatorData.descending)
  }

  getUser(userId: string){
    return this.http.get<any>(this._global.apiUrl + "api/AspNetUsers/" + userId)
  }

  putUser(user: AspNetUsers){
    return this.http.put<responseData>(this._global.apiUrl + "api/AspNetUsers/" + user.id, user)
  }

  postUser(user: AspNetUsers){
    return this.http.post<responseData>(this._global.apiUrl + "api/AspNetUsers", user)
  }

}
