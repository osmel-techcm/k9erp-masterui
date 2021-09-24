import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router, private config: ConfigService) {
  }

  canActivate(): boolean {    

    if (!this.config.serverIsAlive()) {
      this._router.navigate(['/notfound'])
      return
    }

    if (this.config.IsRegistered() != 'True') {
      this._router.navigate(['/register'])
      return
    }

    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false;
    }

  }
}
