import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  url = environment.apiUrl + '/developers';

  constructor(private _http: HttpClient) {}

  getDeveloper(developerId: number) {
    return this._http.get(`${this.url}/${developerId}`);
  }

  getDevelopers() {
    return this._http.get(`${this.url}/`);
  }

  createDeveloper(developer: any) {
    return this._http.post(`${this.url}/`, developer);
  }

  deleteDeveloper(developerId: number) {
    return this._http.delete(`${this.url}/${developerId}`);
  }

  updateDeveloper(developerId: number, developer: any) {
    return this._http.patch(`${this.url}/${developerId}`, developer);
  }

  getGames(developerId: number) {
    return this._http.get(`${this.url}/${developerId}/games`);
  }
}
