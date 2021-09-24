import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../config/globals';
import { AspNetUsersGroups } from '../models/aspNetUsersGroups';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class AspNetUsersGroupService {

  constructor(private http: HttpClient, private _global: Globals) { }

  getAspNetUsersGroupByCustomer(idCustomer) {
    return this.http.get<responseData>(this._global.apiUrl + "api/AspNetUsersGroups/GetAspNetUsersGroupByCustomer?idCustomer=" + idCustomer);
  }

  postAspNetUsersGroup(AspNetUsersGroups: AspNetUsersGroups) {
    return this.http.post<responseData>(this._global.apiUrl + "api/AspNetUsersGroups/", AspNetUsersGroups);
  }

  putAspNetUsersGroup(_aspNetUsersGroups: AspNetUsersGroups) {
    return this.http.put<responseData>(this._global.apiUrl + "api/AspNetUsersGroups/" + _aspNetUsersGroups.id, _aspNetUsersGroups);
  }


}
