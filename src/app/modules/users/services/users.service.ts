import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  // Almaceno el token para enviarlo al header
  token = localStorage.getItem('token')?.toString() || '';
  headers = new HttpHeaders({ 'user-token': this.token });

  getUsers() {
    return this._http
      .get(`${environment.apiUrl}/user/`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          const users: User[] = [];
          if (response.elemts) {
            response.elemts.map((userItem: any) => {
              const user: User = {
                id: userItem.id || 0,
                name: userItem.name || '',
                surname: userItem.surname || '',
                email: userItem.email || '',
                password: userItem.password || '',
                idRole: userItem.idRole || 0,
                resetToken: userItem.resetToken || '',
                refreshToken: userItem.refreshToken || '',
                createdAt: userItem.createdAt || '',
                updatedAt: userItem.updatedAt || '',
              };
              users.push(user);
            });
          }
          return users;
        })
      );
  }
}
