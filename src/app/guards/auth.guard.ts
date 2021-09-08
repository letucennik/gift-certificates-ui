import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService,
      ) {
      }
    
      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoggedIn = this.authService.isLoggedIn();
        if (isLoggedIn) {
          /** Check if route is restricted by role */
          const userRole= this.authService.getUserRole();
          console.log(userRole);
          console.log(route.data.role);
          if (route.data.role && JSON.stringify(route.data.role)!=userRole) {
            /** Role not authorized so redirect to home page */
            this.router.navigate(['/403']);
            return false;
          }
          /** Authorized so return true */
          return true;
        }
        /** Not logged in so redirect to login page with the return url */
        this.router.navigate(['/login']);
        return false;
      }
  }