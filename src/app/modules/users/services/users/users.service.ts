import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUser(userId: number) {
    return this._http.get(`${environment.apiUrl}/user/${userId}`);
  }

  getAllUsers() {
    return this._http.get(`${environment.apiUrl}/user/`);
  }

  deleteUser(userId: number) {
    return this._http.delete(`${environment.apiUrl}/user/${userId}`);
  }

  updateUser(userId: number, user: any) {
    return this._http.patch(`${environment.apiUrl}/user/${userId}`, user);
  }

  getImage(seed: any) {
    return this._http.get(`https://randomuser.me/api/?seed=${seed}`);
  }
}
