import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../config/globals';

@Injectable({
    providedIn: 'root'
})
export class UnauthorizedInterceptorService implements HttpInterceptor {

    constructor(private _router: Router, private _global: Globals) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req).pipe(
            tap(
                event => { },
                error => {
                    if (error.status === 401) {
                        localStorage.removeItem(this._global.keyStoreLogin);
                        localStorage.removeItem(this._global.keyStoreAuth);
                        this._router.navigate(['/login'])
                    }
                }
            )
        );
    }

}
