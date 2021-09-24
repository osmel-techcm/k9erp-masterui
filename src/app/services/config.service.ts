import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../config/globals';
import { Config } from '../models/config';
import * as  jwt_decode from "jwt-decode";

@Injectable()
export class ConfigService {

  private _IsRegistered = new Config("IsRegistered", "False", true, false, "");
  private _serverStatusAlive = false;

  constructor(private http: HttpClient, private _global: Globals) { }

  dealerIsRegistered() {
    return this.http.get<any>(this._global.apiUrl + "api/Account/dealerIsRegistered")
      .toPromise()
      .then(
        res => {          
          if (!res.error) {
            this._IsRegistered = res.data
          } else {
            console.log("this.IsRegistered", this._IsRegistered)
          }
        },
        err => {
          console.log("Error", err)
        }
      )
  }

  getDealerInfo() {
    return this.http.get<any>(this._global.apiUrl + "api/Account/dealerIsRegistered")
  }

  updateDealerdata(data) {
    this._IsRegistered = data
  }

  checkServerStatus() {
    return this.http.get<any>(this._global.apiUrl + "api/Account/serverStatusAlive")
      .toPromise()
      .then(
        () => {
          this._serverStatusAlive = true
        },
        () => {
          this._serverStatusAlive = false
        }
      )
  }

  IsRegistered() {
    return this._IsRegistered.propValue
  }

  serverIsAlive() {
    return this._serverStatusAlive
  }

  //getTimeZonesInfo() {
  //  return this.http.get<any>(this._global.apiUrl + "api/configs/getTimeZonesInfo")
  //}

  registerDealer(register) {
    return this.http.post<any>(
      this._global.apiUrl + "api/Account/registerDealer", register
    );
  }

  getConfigData() {
    return this.http.get<any>(this._global.apiUrl + "api/configs")
  }

  refreshToken() {
    return this.http.get<any>(this._global.apiUrl + "api/Account/RefreshToken")
  }

  startTokenTimer() {    
    const authMasterData = JSON.parse(localStorage.getItem(this._global.keyStoreAuth))    
    const expDate = new Date(authMasterData.exp * 1000)

    if (!this._global.dateServer) {
      setTimeout(() => {
        this.startTokenTimer()
      }, 100)      
      return
    }

    const diffDate = (expDate.getTime() - this._global.dateServer.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDate < 7) {
      this.refreshToken().subscribe(
        data => {
          if (!data.error) {
            this.saveTokenStorage(data.data)
            this.startTokenTimer()
          }
        },
        err => { console.log(err) }
      )
    } else {
      setTimeout(() => {
        this.startTokenTimer()
      }, 86400000)
      return
    }
  }

  getDateTimeServer() {
    return this.http.get<any>(this._global.apiUrl + "api/Account/getDateTimeServer")
  }

  saveTokenStorage(token) {
    localStorage.setItem(this._global.keyStoreLogin, token);
    localStorage.setItem(this._global.keyStoreAuth, JSON.stringify(jwt_decode(token)));
  }

}
