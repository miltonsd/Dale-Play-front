import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@dlp/auth/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      const token = this._authService.getToken();
      if (token) {
        this._authService.logout();
      }
      this._router.navigate(['/']);
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }
}
