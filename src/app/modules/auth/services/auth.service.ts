import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}

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

  // Cerrar sesion de usuario
  logout() {
    localStorage.removeItem('token');
  }

  // Comprueba el rol del usuario al hacer login
  getRole(): number {
    const token = localStorage.getItem('token') || '';
    const payload: any = jwtDecode(token);
    return payload.role;
  }
}