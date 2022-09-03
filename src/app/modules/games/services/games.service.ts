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

  getGames() {
    return this._http
      .get(`${environment.apiUrl}/game/`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const games: Game[] = [];
          if (response.elemts) {
            response.elemts.map((gameItem: any) => {
              const game: Game = {
                id: gameItem.id || 0,
                name: gameItem.name || '',
                image: gameItem.image || '',
                valoration: gameItem.valoration || 0,
                idCategory: gameItem.idCategory || 0,
                idDeveloper: gameItem.idDeveloper || 0,
                description: gameItem.description || '',
                createdAt: gameItem.createdAt || '',
                updatedAt: gameItem.updatedAt || '',
              };
              games.push(game);
            });
          }
          return games;
        })
      );
  }
}
