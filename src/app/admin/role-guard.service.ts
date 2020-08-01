import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate {

  constructor(private _authService: LoginService, private _router: Router) { }

  checkAdmin(): boolean {
    const credentials = jwt_decode(localStorage.getItem('token'));
    const time = new Date().getTime();
    if (credentials.admin && credentials.role === "admin" && credentials.exp < time) return true;
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.loggedIn()) {
      if(!this.checkAdmin()){
        this._router.navigate(['/'], {
          queryParams: {
            return: state.url
          }
        });
        return false;
      }
      return true;
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

