import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  url = environment.apiUrl + '/roles';

  constructor(private _http: HttpClient) {}

  getRole(roleId: number) {
    return this._http.get(`${this.url}/${roleId}`);
  }

  getRoles() {
    return this._http.get(`${this.url}/`);
  }

  createRole(role: any) {
    return this._http.post(`${this.url}/`, role);
  }

  deleteRole(roleId: number) {
    return this._http.delete(`${this.url}/${roleId}`);
  }

  updateRole(roleId: number, role: any) {
    return this._http.patch(`${this.url}/${roleId}`, role);
  }
}
