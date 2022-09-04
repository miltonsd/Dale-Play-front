import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  constructor(private _http: HttpClient) {}

  getDeveloper(devId: number) {
    return this._http.get(`${environment.apiUrl}/developer/${devId}`);
  }

  getAllDevelopers() {
    return this._http.get(`${environment.apiUrl}/developer`);
  }

  createDeveloper(developer: any) {
    return this._http.post(`${environment.apiUrl}/developer`, developer);
  }

  deleteDeveloper(devId: number) {
    return this._http.delete(`${environment.apiUrl}/developer/${devId}`);
  }

  updateDeveloper(devId: number, developer: any) {
    return this._http.patch(
      `${environment.apiUrl}/developer/${devId}`,
      developer
    );
  }
}
