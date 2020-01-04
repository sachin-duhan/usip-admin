import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './service/login.service';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: LoginService,
    private _router: Router) { }

  checkAdmin(): boolean {
    const credentials = jwt_decode(localStorage.getItem('token'));
    if (credentials.admin) return true;
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.loggedIn()) {
      if (!this.checkAdmin()) {
        return true;
      }
      this._router.navigate(['/'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    } else {
      this._router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
