import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private _http: HttpClient) {}

  // Almaceno el token para enviarlo al header
  token = localStorage.getItem('token')?.toString() || '';
  headers = new HttpHeaders({ 'user-token': this.token });

  getGame(gameId: number) {
    return this._http.get(`${environment.apiUrl}/game/${gameId}`, {
      headers: this.headers,
    });
  }

  getGames() {
    return this._http.get(`${environment.apiUrl}/game/`, {
      headers: this.headers,
    });
  }
}
