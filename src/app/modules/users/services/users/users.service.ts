import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { Game } from '@dlp/games/models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUser(userId: number) {
    return this._http.get(`${environment.apiUrl}/users/${userId}`);
  }

  getAllUsers() {
    return this._http.get(`${environment.apiUrl}/users/`);
  }

  deleteUser(userId: number) {
    return this._http.delete(`${environment.apiUrl}/users/${userId}`);
  }

  updateUser(userId: number, user: any) {
    return this._http.patch(`${environment.apiUrl}/users/${userId}`, user);
  }

  getImage(seed: any) {
    return this._http.get(`https://randomuser.me/api/?seed=${seed}`);
  }

  getUserGames(userId: number) {
    return this._http.get(`${environment.apiUrl}/users/${userId}/games`);
  }
}
