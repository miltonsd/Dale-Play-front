import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  url = environment.apiUrl + '/games';

  constructor(private _http: HttpClient) {}

  getGame(gameId: number) {
    return this._http.get(`${this.url}/${gameId}`);
  }

  getGames() {
    return this._http.get(`${this.url}/`);
  }

  createGame(game: any) {
    return this._http.post(`${this.url}/`, game);
  }

  deleteGame(gameId: number) {
    return this._http.delete(`${this.url}/${gameId}`);
  }

  updateGame(gameId: number, game: any) {
    return this._http.patch(`${this.url}/${gameId}`, game);
  }

  getGamesByDeveloper(devId: number) {
    return this._http.get(`${this.url}/developer/${devId}`);
  }
}
