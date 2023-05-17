import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class LoginAuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router, private loginService: LoginService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token = this.cookieService.get('Token');
      if (token) {
        return new Promise<boolean>((resolve) => {
          this.loginService.type_auth(token).subscribe(token => {
            if (token.code == 200 && (token.results.permission == "Admin" || token.results.permission == "User" )) {
              resolve(true)
            }else{
              this.router.navigate(['notfound/']);
            }
          })
        })
      }else{
        return this.router.navigate(['notfound/']);
      }
  }

}
