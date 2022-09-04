import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '@dlp/auth/services';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  headers!: any;
  constructor(private _authService: AuthService) {}
  intercept(req: any, next: any) {
    const headers = req.headers.set('user-token', this._authService.getToken());
    const tokenizedReq = req.clone({ headers });
    return next.handle(tokenizedReq);
  }
}
