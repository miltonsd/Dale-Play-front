import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private _http: HttpClient) {}

  getGame(gameId: number) {
    return this._http.get(`${environment.apiUrl}/games/${gameId}`);
  }

  getAllGames() {
    return this._http.get(`${environment.apiUrl}/games/`);
  }

  createGame(game: any) {
    return this._http.post(`${environment.apiUrl}/games/`, game);
  }

  deleteGame(gameId: number) {
    return this._http.delete(`${environment.apiUrl}/games/${gameId}`);
  }

  updateGame(gameId: number, game: any) {
    return this._http.patch(`${environment.apiUrl}/games/${gameId}`, game);
  }

  getGamesByCategory(categoryId: number) {
    return this._http.get(`${environment.apiUrl}/games/category/${categoryId}`);
  }

  getGamesByDeveloper(devId: number) {
    return this._http.get(`${environment.apiUrl}/games/developer/${devId}`);
  }

  getGamesByUser(userId: number) {
    return this._http.get(`${environment.apiUrl}/games/user/${userId}`);
  }

  addGameToUser(gameId: number) {
    return this._http.post(`${environment.apiUrl}/usergame/`, gameId);
  }
}
