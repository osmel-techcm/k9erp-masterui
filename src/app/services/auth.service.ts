import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../config/globals';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private _global: Globals) { }

  loginUser(user) {
    return this.http.post<any>(this._global.apiUrl + "api/Account/login", user);
  }

  loggedIn() {
    return !!localStorage.getItem("authMasterDataToken");
  }

  getUserProfile() {
    return this.http.get<any>(
      this._global.apiUrl + "api/Account/getUserProfile"
    );
  }

  updateUserProfile(userProfile) {
    return this.http.post<any>(
      this._global.apiUrl + "api/Account/updateUserProfile", userProfile
    );
  }
  
}
