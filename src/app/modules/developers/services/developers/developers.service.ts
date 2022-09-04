import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  constructor(private _http: HttpClient) {}

  // Almaceno el token para enviarlo al header
  token = localStorage.getItem('token')?.toString() || '';
  headers = new HttpHeaders({ 'user-token': this.token });

  getDeveloper(devId: number) {
    return this._http.get(`${environment.apiUrl}/developer/${devId}`, {
      headers: this.headers,
    });
  }

  getAllDevelopers() {
    return this._http.get(`${environment.apiUrl}/developer`, {
      headers: this.headers,
    });
  }

  createDeveloper(developer: any) {
    return this._http.post(`${environment.apiUrl}/developer`, developer, {
      headers: this.headers,
    });
  }

  deleteDeveloper(devId: number) {
    return this._http.delete(`${environment.apiUrl}/developer/${devId}`, {
      headers: this.headers,
    });
  }

  updateDeveloper(devId: number, developer: any) {
    return this._http.patch(
      `${environment.apiUrl}/developer/${devId}`,
      developer,
      { headers: this.headers }
    );
  }
}
