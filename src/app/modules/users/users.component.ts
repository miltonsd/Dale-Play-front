import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { User } from './models/User';

@Component({
  selector: 'dlp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {
    // Cargar los usuarios
    this._usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
