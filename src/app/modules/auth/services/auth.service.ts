import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  register(user: any) {
    return this._http.post<any>(`${environment.apiUrl}/user/register`, user);
  }

  login(user: any) {
    return this._http.post<any>(`${environment.apiUrl}/user/login`, user);
  }

  // Comprueba si el token esta almacenado
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
