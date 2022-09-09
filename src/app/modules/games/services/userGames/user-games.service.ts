import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserGamesService {
  url = environment.apiUrl + '/usergames';

  constructor(private _http: HttpClient) {}

  addUserGame(gameId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = 'idGame=' + gameId;
    return this._http.post(`${this.url}/`, body, {
      headers: headers,
    });
  }
}
