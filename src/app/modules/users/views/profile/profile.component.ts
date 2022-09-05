import { Component, OnInit } from '@angular/core';

import { UsersService } from '@dlp/users/services';
import { AuthService } from '@dlp/auth/services';
import { GamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'dlp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  games: Game[] = [];

  displayedColumns: string[] = [
    'image',
    'name',
    'developer',
    'category',
    'valoration',
    'acciones',
  ];

  dataSource!: MatTableDataSource<Game>;

  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
    private _gamesService: GamesService
  ) {}

  ngOnInit(): void {
    // Obtiene el id del usuario loggeado
    const userId = this._authService.getCurrentUserId();
    // Cargar el usuario
    this._usersService.getUser(userId).subscribe({
      next: (res: any) => {
        // Guardo la info del usuario
        this.user = {
          id: res.elemnt.id,
          name: res.elemnt.name,
          surname: res.elemnt.surname,
          email: res.elemnt.email,
          createdAt: res.elemnt.createdAt.slice(0, 10),
        };
        console.log('TESTING');

        // Busco los juegos que posee el usuario
        this._gamesService.getGamesByUser(userId).subscribe({
          next: (resGame: any) => {
            console.log('TESTING 2');
            console.log(resGame.games);
            this.games = resGame.games;
            this.dataSource = new MatTableDataSource(this.games);
          },
          error: (err) => {
            console.error(`Código de error ${err.status}: `, err.error.msg);
          },
        });
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
