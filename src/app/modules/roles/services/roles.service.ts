import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private _http: HttpClient) {}

  getRole(roleId: number) {
    return this._http.get(`${environment.apiUrl}/role/${roleId}`);
  }

  getAllRoles() {
    return this._http.get(`${environment.apiUrl}/role/`);
  }
}
