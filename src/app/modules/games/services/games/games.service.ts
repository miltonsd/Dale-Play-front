import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private _http: HttpClient) {}

  getGame(gameId: number) {
    return this._http.get(`${environment.apiUrl}/game/${gameId}`);
  }

  getAllGames() {
    return this._http.get(`${environment.apiUrl}/game/`);
  }

  createGame(game: any) {
    return this._http.post(`${environment.apiUrl}/game/`, game);
  }

  deleteGame(gameId: number) {
    return this._http.delete(`${environment.apiUrl}/game/${gameId}`);
  }

  updateGame(gameId: number, game: any) {
    return this._http.patch(`${environment.apiUrl}/game/${gameId}`, game);
  }

  getGamesByCategory(categoryId: number) {
    return this._http.get(`${environment.apiUrl}/game/category/${categoryId}`);
  }

  getGamesByDeveloper(devId: number) {
    return this._http.get(`${environment.apiUrl}/game/developer/${devId}`);
  }

  getGamesByUser(userId: number) {
    return this._http.get(`${environment.apiUrl}/game/user/${userId}`);
  }
}
