import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router, private loginService: LoginService) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var token = this.cookieService.get('Token');
    if (token) {
      return new Promise<boolean>((resolve) => {
        this.loginService.type_auth(token).subscribe(token => {
          if (token.code == 200 && token.results.permission == "Admin") {
            resolve(true)
          }else{
            resolve(false)
          }
        })
      })
    }else{
      return false
    }
  }

}
