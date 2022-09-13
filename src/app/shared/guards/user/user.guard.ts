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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Valida que el rol del usuario sea el correspondiente al de 'Usuario' (roleId = 2)
    if (this._authService.getRole() === 2) {
      return true;
    } else {
      this._router.navigate(['/store']);
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this._authService.getRole() === 2) {
      return true;
    } else {
      this._router.navigate(['/store']);
      return false;
    }
  }
}
