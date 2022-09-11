import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = environment.apiUrl + '/users';

  constructor(private _http: HttpClient) {}

  getUser(userId: number) {
    return this._http.get(`${this.url}/${userId}`);
  }

  getUsers() {
    return this._http.get(`${this.url}/`);
  }

  deleteUser(userId: number) {
    return this._http.delete(`${this.url}/${userId}`);
  }

  updateUser(userId: number, user: any) {
    return this._http.patch(`${this.url}/${userId}`, user);
  }

  getImage(seed: any) {
    return this._http.get(
      `https://randomuser.me/api/?seed=${seed}&inc=picture`
    );
  }

  getRandomImage() {
    return this._http.get('https://randomuser.me/api/?inc=picture');
  }

  getUserGames(userId: number) {
    return this._http.get(`${this.url}/${userId}/games`);
  }
}
