import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Globals } from '../config/globals';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private _global: Globals) { }

    intercept(req, next) {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem(this._global.keyStoreLogin) || ''
        });

        //console.log(req)

        const cloneReq = req.clone({ headers });

        return next.handle(cloneReq)
    }
}
