import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppPaths } from '../constants/app.constants';
import { LoginService } from '../services/login.service';

@Injectable({
              providedIn: 'root',
            })
export class AuthenticationGuard implements CanActivate {

  constructor( private loginService: LoginService, private router: Router ) {
  }

  canActivate() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.getIsUserLogged()) {
      return true
    } else {
      this.router.navigate([ AppPaths.LOGIN ]).then();
      return false
    }
  }
}


