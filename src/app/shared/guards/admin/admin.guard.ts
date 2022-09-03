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
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Valida que el rol del usuario sea el correspondiente al de 'Administrador' (roleId = 1)
    if (this._authService.getRole() === 1) {
      return true;
    } else {
      this._router.navigate(['/store']);
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this._authService.getRole() === 1) {
      return true;
    } else {
      this._router.navigate(['/store']);
      return false;
    }
  }
}
